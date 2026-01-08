import { AppServer, MockKey } from '../types';

function initBirthdaySettingsRoutes(server: AppServer) {
  server.get('/birthday', (schema) => {
    const settings = schema.first(MockKey.BIRTHDAYS_SETTINGS);
    return {...settings?.attrs};
  });

  server.put('/birthday/can-view', (schema, request) => {
    const newAttributes = JSON.parse(request.requestBody);
    const settings = schema.first(MockKey.BIRTHDAYS_SETTINGS);

    if (settings) {
      settings.update(newAttributes);
    }

    return {success: true};
  });
}

export { initBirthdaySettingsRoutes };
