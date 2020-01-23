import { name } from './package.json';

module.exports = {
  apps: [
    {
      name,
      script: 'build/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
