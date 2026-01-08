import { IS_MOCKED_RESPONSE_USE } from '.';

const main = process.env.NEXT_PUBLIC_API_URL;
const apiBaseUrl = main + '/api';

const ApiUrl = {
  MAIN: IS_MOCKED_RESPONSE_USE ? '' : main,
  API_BASE_URL: apiBaseUrl,
  ABOUT_US: '/who-we-are',
  BLOCKS: '/blocks',
  CONTACTS: '/contacts',
  COMPLIANCE: '/compliance',
  DOCUMENTATION: '/documentation',
  FORM: '/contact-form',
  MAIN_PAGE: '/main',
  MENU: '/menu',
  NEWS_MEDIA: '/news',
  NEWS_MEDIA_ONE: '/news/:code',
  PARTNERS: '/partners',
  PRODUCTS: '/products',
  PRODUCT_ONE: '/products/:code',
  SOLUTIONS: '/industries',
  SOLUTIONS_ONE: '/industries/:code',
  SUCCESS_STORIES: '/success-stories',
  USE_CASES: '/use-cases',
  USE_CASE_ONE: '/use-cases/:code',
  QUESTIONS: '/questions',
};

export { ApiUrl };
