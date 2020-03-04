'use strict';

// Aqui está um arquivo de configuração baseado em JavaScript.
// Se você precisar de lógica condicional, convém usar esse tipo de configuração.
// Caso contrário, JSON ou YAML é recomendado.

module.exports = {
  diff: true,
  extension: ['js'],
  opts: false,
  package: './package.json',
  // reporter: 'nyan',
  reporter: 'spec',
  slow: 75,
  timeout: 5000,
  ui: 'bdd',
  'watch-files': ['test/**/*.js'],
  'watch-ignore': ['node_modules']
};