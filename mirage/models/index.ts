import { Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import { BirthdaySettingsType, MockKey, UserType } from '../types';

const UserModel: ModelDefinition<UserType> = Model.extend({});
const BirthdaySettingsModel: ModelDefinition<BirthdaySettingsType> = Model.extend({});

const models = {
  [MockKey.USER]: UserModel,
  [MockKey.BIRTHDAYS_SETTINGS]: BirthdaySettingsModel,
};

export default models;
