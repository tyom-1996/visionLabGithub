import { Factory } from 'miragejs';
import { UserType } from '../types';

const MockUser: UserType = {
  id: 'test-S-1-5-21-2000000',
  lastname: 'Тестовая',
  firstname: 'Зинаида',
  patronymic: 'Валерьевна',
  city: 'г. Москва',
};

const userFactory = Factory.extend<UserType>({
  ...MockUser,
  id(i) {
    return i + MockUser.id;
  },
});

export { userFactory };
