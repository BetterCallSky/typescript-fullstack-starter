import { createContract } from 'defensive';
import { connect, Connection, Channel } from 'amqplib';
import { V } from 'veni';
import config from 'config';
import { serviceName } from '../common/serviceName';
import { SendEmailSchema } from '../schemas';

let connection: Connection;
const queueCache: { [x: string]: Channel } = {};

process.once('SIGINT', () => {
  try {
    connection.close();
  } catch (ignore) {}
  process.exit();
});

export async function createConnection() {
  if (connection) {
    return connection;
  }
  connection = await connect(config.AMQP_URL);
  return connection;
}

export const sendToQueue = createContract(serviceName('sendToQueue'))
  .params('msg')
  .schema({
    msg: V.or().items(
      V.object().keys({
        type: V.enum().literal('sendMail'),
        data: V.object().keys(SendEmailSchema),
      }),
      V.object().keys({
        type: V.enum().literal('test'),
        data: V.object().keys({
          foo: V.string(),
        }),
      })
    ),
  })
  .fn(async msg => {
    await createConnection();
    if (!queueCache[msg.type]) {
      const channel = await connection.createChannel();
      channel.assertQueue(msg.type, { durable: true });
      queueCache[msg.type] = channel;
    }
    queueCache[msg.type].sendToQueue(
      msg.type,
      new Buffer(JSON.stringify(msg.data))
    );
  });
