/**
 * Vendor
 */

import micro from 'micro';

/**
 * App
 */

import index from './app';

/**
 * Server
 */

// @ts-ignore
const port = parseInt(process.env.PORT, 10) || 2000;
const server = micro(index);

server.listen(port);
