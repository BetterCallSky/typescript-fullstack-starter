module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [f
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-export-extensions',
  ],
  babelrcRoots: ['.', 'packages/*', 'apps/*'],
};
