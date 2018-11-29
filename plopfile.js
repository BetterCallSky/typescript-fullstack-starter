/* eslint-disable import/no-commonjs */
const path = require('path');
const fs = require('fs');
const promptDirectory = require('inquirer-directory');

function getDirsSync(src) {
  return fs
    .readdirSync(src)
    .filter(file => fs.statSync(path.join(src, file)).isDirectory());
}

module.exports = function generate(plop) {
  plop.setPrompt('directory', promptDirectory);

  plop.setGenerator('modules', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose component name in PascalCase (e.g. UserList)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(
          __dirname,
          'apps/sample-front/src/modules/{{camelCase name}}'
        ),
        base: '.blueprints/module',
        templateFiles: '.blueprints/module/**/**',
      },
    ],
  });
};
