import { AppServer, MockKey } from '../types';

function initUserRoutes(server: AppServer) {
  server.get('/user', (schema) => {
    const user = schema.first(MockKey.USER);
    return {...user?.attrs};
  });
}

export { initUserRoutes };
