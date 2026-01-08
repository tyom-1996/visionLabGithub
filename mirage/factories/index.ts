import { MockKey}  from '../types';
import { birthdaySettingsFactory } from './birthday';
import { userFactory } from './user';

const factories = {
  [MockKey.USER]: userFactory,
  [MockKey.BIRTHDAYS_SETTINGS]: birthdaySettingsFactory,
};

export default factories;
