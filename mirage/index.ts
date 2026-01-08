import { createServer } from 'miragejs';
import models from './models';
import factories from './factories';
import allRoutes from './routes';
import { MockKey } from './types';

function startMockServer() {
  const server = createServer({
    models,
    factories,
    seeds(server) {
      server.createList(MockKey.USER, 10);
      server.create(MockKey.BIRTHDAYS_SETTINGS);
    },
    routes() {
      this.urlPrefix = 'https://backend.ru/';

      // Подключаем все маршруты из routes
      Object.values(allRoutes).forEach((routeHandler) => {
        routeHandler(this);
      });

      // Оставшиеся маршруты перенаправляются на реальные URL
      this.passthrough((request) => {
        const ignoredPrefixes = ['__next', '/_next', '/static'];
        return ignoredPrefixes.some((prefix) => request.url.startsWith(prefix));
      });
      this.passthrough();
    },
  });

  // Логирование всех маршрутов в консоль
  server.logging = true;
}

export default startMockServer;
