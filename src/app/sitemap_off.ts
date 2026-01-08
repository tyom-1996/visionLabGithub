// TODO: по просьбе заменили на файл sitemap.xml
import { MetadataRoute } from 'next';
import { RoutePath } from '@/consts/routes';
import { getProductsData } from '@/api/products';
import { getSolutionsData } from '@/api/solutions';
import { getUseCasesData } from '@/api/useCases';
import { getNewsMediaData } from '@/api/newsMedia';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const getNewsMediaSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const newsMediaList = (await getNewsMediaData())?.data || [];

  return newsMediaList
    .filter(newsMedia => !newsMedia?.href?.startsWith('http'))
    .map(newsMedia => ({
      url: siteUrl + RoutePath.NEWS_MEDIA + '/' + newsMedia?.href,
      lastModified: new Date().toISOString(),
    }));
};

const getProductsSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const products = await getProductsData();

  return products?.products.map(product => ({
    url: siteUrl + RoutePath.PRODUCTS + '/' + product.code,
    lastModified: new Date().toISOString(),
  })) ?? [];
};

const getSolutionsSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const solutions = await getSolutionsData();

  return solutions?.solutions.map(solution => ({
    url: siteUrl + RoutePath.SOLUTIONS + '/' + solution.code,
    lastModified: new Date().toISOString(),
  })) ?? [];
};

const getUseCasesSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const useCases = await getUseCasesData();

  return useCases?.usecases.map(useCase => ({
    url: siteUrl + RoutePath.USE_CASES + '/' + useCase.code,
    lastModified: new Date().toISOString(),
  })) ?? [];
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const routesArray = Object.values(RoutePath).map((path) => ({
    url: siteUrl + path,
    lastModified: new Date().toISOString(),
  }));

  const newsMedia = await getNewsMediaSitemap();
  const products = await getProductsSitemap();
  const solutions = await getSolutionsSitemap();
  const useCases = await getUseCasesSitemap();

  return [...routesArray, ...products, ...solutions, ...useCases, ...newsMedia];
};

export default sitemap;
