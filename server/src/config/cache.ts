import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIST_HOST,
      port: process.env.REDIST_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;
