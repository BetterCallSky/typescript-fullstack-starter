import fs from 'fs';
import Path from 'path';
import * as R from 'r';
import { ContractBinding } from 'defensive';

const names = fs.readdirSync(Path.join(__dirname, './services'));

export const contracts = R.flatMap(names, name =>
  Object.values(require('./services/' + name) as ContractBinding<any>[])
);
