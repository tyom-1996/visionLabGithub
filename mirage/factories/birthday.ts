import { Factory } from 'miragejs';
import { BirthdaySettingsType } from '../types';

const MockBirthdaySettings = { can_view: 'all_users', reminders: [] };
const birthdaySettingsFactory = Factory.extend<BirthdaySettingsType>(MockBirthdaySettings);

export { birthdaySettingsFactory };
