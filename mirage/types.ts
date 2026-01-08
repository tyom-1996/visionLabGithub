import { Registry, Server } from 'miragejs';
import models from './models';
import factories from './factories';

type AppRegistry = Registry<typeof models, typeof factories>;
type AppServer = Server<AppRegistry>;

// Важное правило: значения в MockKey (например, 'user', 'birthdaySetting')
// не должны заканчиваться на букву 's', чтобы избежать конфликтов с генерацией
// имен моделей или фабрик в Mirage.js.
enum MockKey {
  USER = 'user',
  BIRTHDAYS_SETTINGS = 'birthdaySetting',
}

type BirthdaySettingsType = {
  can_view: string;
  reminders: number[];
};

type UserType = {
  id: string;
  lastname: string;
  firstname: string;
  patronymic: string;
  city: string;
};

export { MockKey };
export type { AppServer, BirthdaySettingsType, UserType };
