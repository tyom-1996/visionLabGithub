import { ApiUrl } from '@/consts/apiUrl';
import { ADDITIONAL_DATA_MOCK } from './additionalData.mock';
import { CONTACTS_MOCK } from './contacts.mock';
import { DOCUMENTATION_MOCK } from './documentation.mock';
import { FORM_MOCK } from './form.mock';
import { MAIN_PAGE_MOCK } from './mainPage.mock';
import { MENU_MOCK } from './navigation.mock';
import { PRODUCTS_MOCK } from './products.mock';
import { SOLUTIONS_MOCK } from './solutions.mock';
import { SOLUTION_DETAILS_MOCK } from './solutions.one.mock';
import { SUCCESS_STORIES_MOCK } from './sussesStories.mock';
import { NEWS_MEDIA_MOCK } from './newsMedia.mock';
import { NEWS_MEDIA_DETAILS_MOCK } from './newsMedia.one.mock';
import { PRODUCT_DETAILS_MOCK } from './products.one.mock';
import { USE_CASES_MOCK_DATA } from './useCases.mock';
import { USE_CASE_DETAILS_MOCK } from './useCases.one.mock';
import { COMPLIANCE_MOCK } from './compliance.mock';
import { ABOUT_US_MOCK } from './aboutUs.mock';
import { PARTNERS_MOCK } from './partners.mock';
import { QUESTIONS } from './questions.mock';

export const mocks = {
  [ApiUrl.ABOUT_US]: ABOUT_US_MOCK,
  [ApiUrl.BLOCKS]: ADDITIONAL_DATA_MOCK,
  [ApiUrl.COMPLIANCE]: COMPLIANCE_MOCK,
  [ApiUrl.CONTACTS]: CONTACTS_MOCK,
  [ApiUrl.DOCUMENTATION]: DOCUMENTATION_MOCK,
  [ApiUrl.FORM]: FORM_MOCK,
  [ApiUrl.MAIN_PAGE]: MAIN_PAGE_MOCK,
  [ApiUrl.MENU]: MENU_MOCK,
  [ApiUrl.NEWS_MEDIA]: NEWS_MEDIA_MOCK,
  [ApiUrl.NEWS_MEDIA_ONE]: NEWS_MEDIA_DETAILS_MOCK,
  [ApiUrl.PARTNERS]: PARTNERS_MOCK,
  [ApiUrl.PRODUCTS]: PRODUCTS_MOCK,
  [ApiUrl.PRODUCT_ONE]: PRODUCT_DETAILS_MOCK,
  [ApiUrl.SOLUTIONS]: SOLUTIONS_MOCK,
  [ApiUrl.SOLUTIONS_ONE]: SOLUTION_DETAILS_MOCK,
  [ApiUrl.SUCCESS_STORIES]: SUCCESS_STORIES_MOCK,
  [ApiUrl.USE_CASES]: USE_CASES_MOCK_DATA,
  [ApiUrl.USE_CASE_ONE]: USE_CASE_DETAILS_MOCK,
  [ApiUrl.QUESTIONS]: QUESTIONS,
};
