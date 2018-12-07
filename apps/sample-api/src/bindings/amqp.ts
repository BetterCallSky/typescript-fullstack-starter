import { ContractBinding } from 'defensive';
import { Channel } from 'amqplib';
import { sendToQueue } from '../services/Queue';

ContractBinding.prototype.amqp = function(options) {
  if (!this.fn.amqpOptions) {
    this.fn.amqpOptions = [];
  }
  this.fn.amqpOptions.push(options);
  return this.fn as any;
};

type GetArgs<T> = T extends ((arg: infer V) => any) ? V : T;
type QueueArgs = GetArgs<typeof sendToQueue>;

type FilterQueueArgs<K, T extends string> = K extends { type: T; data: infer D }
  ? D
  : never;

type AmqpOptions<T extends string> = {
  prefetch?: number;
  nackDelay?: string;
  type: T;
  handler(msg: FilterQueueArgs<QueueArgs, T>): Promise<void> | void;
};

declare module 'defensive' {
  interface ContractBinding<T> {
    amqpOptions?: AmqpOptions<any>[];
    amqp<M extends string>(options: AmqpOptions<M>): T & ContractBinding<T>;
  }
}
