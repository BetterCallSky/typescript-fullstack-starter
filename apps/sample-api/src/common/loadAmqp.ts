import * as R from 'r';
import { ContractBinding } from 'defensive';
import ms from 'ms';
import logger from './logger';
import { createConnection } from '../services/Queue';

const delay = (time: string) =>
  new Promise(resolve => setTimeout(resolve, ms(time)));

export async function loadAmqp(bindings: ContractBinding<any>[]) {
  const connection = await createConnection();

  R.flatMap(bindings, x => x.amqpOptions || []).map(async options => {
    logger.info(`queue listener on "${options.type}"`);
    const { handler, prefetch, nackDelay, type } = options;
    const channel = await connection.createChannel();
    await channel.assertQueue(type, { durable: true });
    channel.prefetch(prefetch || 1);
    channel.consume(type, async msg => {
      if (!msg) {
        return;
      }
      let data: any;
      try {
        data = JSON.parse(msg.content.toString());
      } catch (e) {
        logger.error('Invalid json message', msg);
        channel.ack(msg);
        return;
      }
      try {
        await handler(data);
        channel.ack(msg);
      } catch (e) {
        logger.error(e, 'Error when processing message', msg);
        if (nackDelay) {
          // just for demonstrations
          // retry delay should be implemented by rabbitmq but
          // it requires a special plugin
          await delay(nackDelay);
        }
        channel.reject(msg, true);
      }
    });
  });
}
