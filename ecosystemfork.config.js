const config = require('config');

module.exports = {
  apps: [
    {
      name: 'CODERHOUSE',
      exec_mode: 'fork',
      instances: '1',
      script: 'src/server.js',
      instance_var: 'INSTANCE_ID',
      args: 'start',
      env: {
        p: 8080,
        ...config,
      },
    },
    {
      name: 'CODERHOUSE2',
      exec_mode: 'fork',
      instances: '1',
      script: 'src/server.js',
      instance_var: 'INSTANCE_ID',
      args: 'start',
      env: {
        p: 8081,
        m: 'cluster',
        ...config,
      },
    },
    {
      name: 'CODERHOUSE3',
      exec_mode: 'fork',
      instances: '1',
      script: 'src/server.js',
      instance_var: 'INSTANCE_ID',
      args: 'start',
      env: {
        p: 8083,
        ...config,
      },
    },
    {
      name: 'CODERHOUSE4',
      exec_mode: 'fork',
      instances: '1',
      script: 'src/server.js',
      instance_var: 'INSTANCE_ID',
      args: 'start',
      env: {
        p: 8084,
        ...config,
      },
    },
    {
      name: 'CODERHOUSE5',
      exec_mode: 'fork',
      instances: '1',
      script: 'src/server.js',
      instance_var: 'INSTANCE_ID',
      args: 'start',
      env: {
        p: 8085,
        ...config,
      },
    },
  ],
};
