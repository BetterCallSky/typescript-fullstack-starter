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

  plop.setHelper('uiToPascal', text =>
    plop.getHelper('pascalCase')(text.replace('ui-', '')),
  );
  plop.setHelper(
    'pascalToUI',
    text => `ui-${plop.getHelper('dashCase')(text)}`,
  );

  plop.setActionType('appendToDocs', answers => {
    const moduleName = answers.name;
    const componentName = plop.getHelper('uiToPascal')(moduleName);
    const pkgPath = path.join(__dirname, 'apps/docs/package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.dependencies[moduleName] = '*';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');

    const storybookConfigPath = path.join(
      __dirname,
      'apps/docs/.storybook/config.js',
    );
    const storybookConfig = fs.readFileSync(storybookConfigPath, 'utf8');
    const idx = storybookConfig.lastIndexOf('}');
    const newLine = `  require('../src/stories/${componentName}');\n`;
    const newContent =
      storybookConfig.substr(0, idx) + newLine + storybookConfig.substr(idx);
    fs.writeFileSync(storybookConfigPath, newContent, 'utf8');
    return 'ok';
  });

  plop.setGenerator('component', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose component name in PascalCase (e.g. SearchInput)',
        basePath: '.',
      },
      {
        type: 'list',
        name: 'target',
        message: 'target',
        choices: () => getDirsSync(path.join(__dirname, 'apps')),
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(
          __dirname,
          'apps/{{target}}/src/components/{{name}}',
        ),
        base: '.blueprints/component',
        templateFiles: '.blueprints/component/**/**',
      },
    ],
  });

  plop.setGenerator('area', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose component name in PascalCase (e.g. SearchInput)',
        basePath: '.',
      },
      {
        type: 'list',
        name: 'target',
        message: 'target',
        choices: () => getDirsSync(path.join(__dirname, 'apps')),
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'apps/{{target}}/src/areas/{{name}}'),
        base: '.blueprints/areas',
        templateFiles: '.blueprints/areas/**/**',
      },
    ],
  });

  plop.setGenerator('ui', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose component name in PascalCase (e.g. SearchInput)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'packages/ui/{{name}}'),
        base: '.blueprints/component',
        templateFiles: '.blueprints/component/**/**',
      },
    ],
  });

  plop.setGenerator('icon', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose component name in PascalCase (e.g. UserIcon)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'packages/icons'),
        base: '.blueprints/icon',
        templateFiles: '.blueprints/icon/**/**',
      },
    ],
  });

  // controller generator
  plop.setGenerator('add story', {
    description: 'Add a new story to apps/docs',
    prompts: [
      {
        type: 'list',
        name: 'name',
        message: 'choose ui component',
        choices: () =>
          getDirsSync(path.join(__dirname, 'packages')).filter(input =>
            /^ui-/.test(input),
          ),
      },
    ],
    actions: [
      {
        type: 'add',
        path: path.join(
          __dirname,
          'apps/docs/src/stories/{{uiToPascal name}}.js',
        ),
        templateFile: '.blueprints/add-story.hbs',
      },
      {
        type: 'appendToDocs',
      },
    ],
  });
};
