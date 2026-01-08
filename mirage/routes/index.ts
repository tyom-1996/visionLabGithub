import { initBirthdaySettingsRoutes } from './birthday';
import { initUserRoutes } from './user';
import { MockKey } from '../types';

const routes = {
  [MockKey.USER]: initUserRoutes,
  [MockKey.BIRTHDAYS_SETTINGS]: initBirthdaySettingsRoutes,
};

export default routes;
