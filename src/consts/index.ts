const IS_MOCKED_RESPONSE_USE = process.env.NEXT_PUBLIC_IS_MOCKED_RESPONSE_USE === 'true';
const IS_CACHE_ENABLE = process.env.NEXT_PUBLIC_IS_CACHE_ENABLE === 'true';

const EXTERNAL_LINKS = {
  ENGLISH_VERSION: 'https://visionlabs.ai/',
};

const REVALIDATE_TIME = {
  ONE_DAY: 24 * 60 * 60, // 86400 секунд
  ONE_HOUR: 60 * 60,
};

const ERROR_TEXT = {
  AGREE: 'Your consent is required in order to submit a request',
  CATEGORY: 'Select category',
  EMAIL: 'You have entered an incorrect email address',
  NAME: 'You entered an incorrect name',
  PHONE: 'You have entered an incorrect phone number',
};

const SWIPER_SPACE_BETWEEN = {
  MIN: 1,
  SX: 24,
  MD: 32,
  LG: 49,
  XL: 62,
};

const FORM_CATEGORY_TEXT = {
  DEMO: 'Get demo',
  MORE: 'Learn more',
  PARTNER: 'Partner with us',
};

const MAX_WIDTH_PAGE_CONTENT = 1328;

const WINDOW_SIZE = {
  LG: 1024,
};

const QUESTIONS_BLOCK_TEXT = {
  DEFAULT_TITLE: 'Still have questions?',
  DEFAULT_DESCRIPTION: 'Send a request and we will get back to you as soon as possible. We’ll provide detailed information about our products and answer any questions you may have.',
  MORE_TITLE: 'More about Us',
  TELEGRAM_DESCRIPTION: 'Read about our team, new projects, and company technologies on our LinkedIn page',
};

export {
  ERROR_TEXT,
  EXTERNAL_LINKS,
  FORM_CATEGORY_TEXT,
  IS_MOCKED_RESPONSE_USE,
  IS_CACHE_ENABLE,
  MAX_WIDTH_PAGE_CONTENT,
  REVALIDATE_TIME,
  SWIPER_SPACE_BETWEEN,
  QUESTIONS_BLOCK_TEXT,
  WINDOW_SIZE
};
