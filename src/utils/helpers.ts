import breakpoints from '@/styles/breakpoints.module.scss';
import { ProductDetailsType } from '@/types/components/product';
import { UseCaseDetailsType } from '@/types/components/useCases';
import { SeoType } from '@/types';
import { ResolvingMetadata, Metadata } from 'next';
import DOMPurify from 'isomorphic-dompurify';

const formatToTwoDigits = (num: number) => {
  if (num < 10) {
    return '0' + num.toString();
  }
  return num.toString();
};

const parseBreakpoints = () => {
  const { keys, values } = breakpoints;
  const keysList = keys.split(',').map((key) => key.trim());
  const valuesList = values.split(',').map(value => parseInt(value, 10));

  const parsedBreakpoints = keysList.reduce((acc, key, index) => {
    acc[key] = valuesList[index];
    return acc;
  }, {} as { [key: string]: number });

  return parsedBreakpoints;
};

const splittingArrayIntoSubarrays = <T, >(arr: T[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < arr?.length; i += chunkSize) {
    result.push({
      id: `Chunk-${Math.floor(i / chunkSize) + 1}`,
      cardsList: arr?.slice(i, i + chunkSize),
    });
  }
  return result;
};

const handleCopyToClipboard = (args: { info: string, title?: string, isAlertShow?: boolean }) => {
  const { info, title, isAlertShow = true } = args;

  if (typeof window === 'undefined') {
    return;
  }

  navigator?.clipboard
    .writeText(info)
    .then(() => {
      if (isAlertShow) {
        const text = title ? `${title} copied!` : 'Successfully copied!';
        alert(text);
      }
    })
    .catch((error) => {
      console.error('Copying error: ', error);
    });
};

const handleScrollToBlock = ({
  blockId,
  scrollContainerId,
  isHeaderOffsetInclude = false,
  additionalOffset = 0,
}: {
  blockId: string,
  scrollContainerId?: string,
  isHeaderOffsetInclude?: boolean,
  additionalOffset?: number,
}) => {
  if (typeof window === 'undefined') {
    return;
  }

  const blockElement = document.getElementById(blockId);
  const scrollContainer = scrollContainerId && document.getElementById(scrollContainerId);
  const finalScrollTarget = scrollContainer || window;

  if (blockElement) {
    const headerHeight = isHeaderOffsetInclude ? 56 : 0;
    const finalOffset = additionalOffset + headerHeight;
    finalScrollTarget.scrollTo({ top: blockElement.offsetTop - finalOffset, behavior: 'smooth' });
  }
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

const removeSpacesInLine = (str: string) => {
  return str.replace(/\s+/g, '');
};

function inViewport(el: Element) {
  if (!el) {
    return false;
  }

  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function isInViewportArea(el: Element | null, area = 1) { // area = 1 видно 100% блока
  if (!el) {
    return true;
  }

  const bounding = el.getBoundingClientRect();
  const wh = window.innerHeight || document.documentElement.clientHeight;

  if (bounding.top >= 0 && bounding.top < wh) {
    if (wh - bounding.top >= bounding.height * area) {
      return true;
    }
  } else if (bounding.bottom <= wh && bounding.bottom >= 0) {
    if (wh - bounding.bottom >= bounding.height * area) {
      return true;
    }
  }

  return false;
}

const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: unknown[]) => {
    clearTimeout(timeoutId); // Очищаем предыдущий таймер
    timeoutId = setTimeout(() => func(...args), delay); // Устанавливаем новый таймер
  };
};

const throttle = (func: (...args: unknown[]) => void, limit: number) => {
  let throttleTimer: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return (...args: unknown[]) => {
    if (!lastRan) {
      // Если функция не запускалась, вызываем её сразу
      func(...args);
      lastRan = Date.now();
    } else {
      // Очищаем предыдущий таймер
      clearTimeout(throttleTimer);

      // Устанавливаем новый таймер
      throttleTimer = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
const makeEvenLengthArray = <T>(arr: T[]): T[] => {
  const newLength = arr.length % 2 === 0 ? arr.length : arr.length - 1;
  return arr.slice(0, newLength);
};

/**
 * Отключает прокрутку страницы, компенсируя ширину скроллбара
 */
const disableBodyScroll = () => {
  if (typeof window === 'undefined') return;

  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  // Сохраняем ширину скроллбара в CSS-переменную
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);

  // Добавляем классы к <html> и <body> , блокируя прокрутку
  document.body.classList.add('no-scroll');
  document.documentElement.classList.add('no-scroll');
};

/**
 * Восстанавливает прокрутку страницы, убирая ограничения.
 */
const enableBodyScroll = () => {
  if (typeof window === 'undefined') return;

  // Убираем блокировку и CSS-переменную
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.remove('no-scroll');
  document.documentElement.style.removeProperty('--scrollbar-width');
};

/**
 * Возвращает слово в правильной форме в зависимости от числа, перед которым оно стоит.
 *
 * @param count - число, определяющее форму слова
 * @param forms - массив из трёх вариантов слова:
 *   1. Единственное число, именительный падеж (например, "причина")
 *   2. Единственное число, родительный падеж (например, "причины")
 *   3. Множественное число, родительный падеж (например, "причин")
 * @returns Слово в нужной форме
 */
const getPluralForm = (count: number, forms: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)];
  return forms[index];
};

const checkTouchDevice = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    'ontouchstart' in window || // Для старых браузеров, поддерживающих touchstart
    navigator.maxTouchPoints > 0 || // Для современных браузеров
    window.matchMedia('(pointer: coarse)').matches // Для устройств с грубым указателем (тач-экраны)
  );
};

const textAnimation = (element: HTMLElement) => {
  if (!element) {
    return;
  }

  let timerId = element.dataset.timerId;

  if (element.dataset.timerId) {
    clearInterval(timerId);
  }

  const letters = 'ABCDEqwertyuihjkl;!&$(*^%PQRSTUVWXYZ';
  let itrs = 0;

  // Сохраняем оригинальный текст
  element.dataset.originalText = element.dataset.originalText || element.innerText;

  const text = element.dataset.originalText;
  let innerText = text.split('');

  timerId = String(setInterval(() => {
    innerText = innerText.map((letter: string, index: number) => {
      if (index < itrs) {
        return text[index];
      }

      return letters[Math.floor(Math.random() * 36)];
    });

    if (itrs >= text.length) {
      clearInterval(timerId);
    };

    itrs += 1 / 10;

    requestAnimationFrame(() => {
      element.innerText = innerText.join('');
    });
  }, 5));
};

function textAnimationRandomString(length: number) {
  const chars = 'ABCDEqwertyuihjkl;!&$(*^%PQRSTUVWXYZ';
  let result = '';

  // Используем crypto.getRandomValues() если доступно
  const randomValues = new Uint32Array(length);
  if (typeof crypto !== 'undefined') {
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
  } else {
    // Fallback для старых браузеров
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return result;
}

const textAnimationV2 = (element: HTMLElement) => {
  if (!element) {
    return;
  }

  // Сохраняем оригинальный текст
  element.dataset.originalText = element.dataset.originalText || element.innerText;

  const text = element.dataset.originalText;
  const firstLetterIterations = 10;
  const duration = 500; // мс
  const timeStep = 20; // мс
  const timePart = duration / text.length;
  const firstLetterShiftTime = firstLetterIterations * timeStep;
  const startTime = performance.now();
  let partIndex = 0;
  let stepIndex = 0;

  // Очищаем предидущий счетчик
  if (element.dataset.timerId) {
    cancelAnimationFrame(Number(element.dataset.timerId));
  }

  element.dataset.timerId = String(requestAnimationFrame(function go() {
    const nowTime = performance.now();

    if (nowTime > startTime + firstLetterShiftTime + duration) {
      element.innerText = text;
      cancelAnimationFrame(Number(element.dataset.timerId));

      return;
    }

    // Смещаем область рандомной замены символов вправо и дамем N итераций смены первой буквы
    if (nowTime > startTime + firstLetterShiftTime + partIndex * timePart) {
      partIndex += 1;
    }

    // Рандомная замена символов
    if (nowTime > startTime + stepIndex * timeStep) {
      const textArr = text.split('');
      textArr.splice(partIndex, text.length - partIndex, textAnimationRandomString(text.length - partIndex));

      element.innerText = textArr.join('');
      stepIndex += 1;
    }

    element.dataset.timerId = String(requestAnimationFrame(go));
  }));
};

const transformProductPageData = ({ product }: { product: ProductDetailsType }) => {
  const solvingProblemsList = product.task_list.map((taskData) => ({
    name: taskData.description,
    description: taskData.value,
  }));

  const opportunitiesData = {
    image: product.possibilities_logo,
    alt: product.possibilities_logo_alt || '',
    title: product.possibilities_logo_title || '',
    list: product.possibilities.map((item) => ({
      id: item.id,
      name: item.bottom_title,
      description: item.bottom_subtitle,
      label: item.title,
      big_text: item.subtitle,
    })),
  };

  const advantagesData = {
    image: product.advantages_logo,
    imageAlt: product.advantages_logo_alt,
    imageTitle: product.advantages_logo_title,
    list: product.advantages,
  };

  return { solvingProblemsList, opportunitiesData, advantagesData };
};

const transformUseCasePageData = ({ useCase }: { useCase: UseCaseDetailsType }) => {
  const resultsData = useCase?.results?.map((result) => ({
    ...result,
    preview_text: result.description,
  }));

  return { resultsData };
};

/**
 * Заполнить мета теги title, description и keywords из seo параметра полученного из запроса
 */
type GenerateMetadataProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const generateMetadataFromSeoParam = (fetchMethod: () => Promise<{ seo?: SeoType } | undefined>) => {
  return async (_: GenerateMetadataProps, parent: ResolvingMetadata): Promise<Metadata> => {
    const pageData = await fetchMethod();
    const parentMetadata = await parent;

    return {
      title: pageData?.seo?.title ?? parentMetadata.title,
      description: pageData?.seo?.description ?? parentMetadata.description,
      keywords: pageData?.seo?.keywords ?? parentMetadata.keywords,
    };
  };
};

/**
 * Очищаем html предотвращая XSS атаки
 */

const cleanHTML = (dirty: string) => {
  const clean = DOMPurify.sanitize(dirty);

  return clean;
};

export {
  checkTouchDevice,
  disableBodyScroll,
  enableBodyScroll,
  formatToTwoDigits,
  getPluralForm,
  handleCopyToClipboard,
  handleScrollToBlock,
  makeEvenLengthArray,
  parseBreakpoints,
  removeSpacesInLine,
  splittingArrayIntoSubarrays,
  inViewport,
  isInViewportArea,
  getRandomInt,
  debounce,
  throttle,
  textAnimation,
  textAnimationV2,
  transformProductPageData,
  transformUseCasePageData,
  generateMetadataFromSeoParam,
  cleanHTML
};
