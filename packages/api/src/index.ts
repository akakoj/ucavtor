import micro from 'micro';
import index from './app';

const port = parseInt(process.env.PORT, 10) || 2000;
const server = micro(index);

server.listen(port);
