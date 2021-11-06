const config = require('config');

module.exports = {
  apps: [
    {
      name: 'CODERHOUSE',
      exec_mode: 'cluster',
      instances: '5',
      script: 'src/server.js',
      instance_var: 'INSTANCE_ID',
      args: 'start',
      env: {
        p: 3005,
        ...config,
      },
    },
  ],
};
