/* config-overrides.js */
/*
Pulled from https://github.com/timarney/react-app-rewired

As per instructions from https://ant.design/docs/react/use-with-create-react-app
*/

const { override, fixBabelImports } = require('customize-cra');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);