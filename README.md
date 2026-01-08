This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Mock Server

Проект использует библиотеку Mirage.js для эмуляции API-запросов, что упрощает тестирование интерфейса без необходимости подключения к реальному backend-серверу.
Mock Server обрабатывает указанные маршруты, а все остальные запросы перенаправляет на реальный backend.

#### Преимущества использования
- Локальная разработка: тестирование изменений UI без зависимости от backend.
- Написание тестов: работа с предсказуемыми и контролируемыми данными.
- Использование при недоступности backend.

#### Управление Mock Server
Можно включить или отключить с помощью переменной окружения NEXT_PUBLIC_IS_MOCK_SERVER_USE:
- true — использовать mock server.
- false — подключение к реальному backend.

#### Структура Mock Server
Все файлы, связанные с Mirage.js, находятся в директории /mirage:
- Фабрики: /mirage/factories — создание моковых данных.
- Модели: /mirage/models — описание данных, используемых сервером.
- Роуты: /mirage/routes — логика обработки запросов.
- Инициализация: /mirage/index.ts — настройка и запуск сервера.

#### Для создания нового mock API-запроса
1. Создать файл с моковыми данными в /mirage/factories/<имя_файла>.ts и импортировать его в /mirage/factories/index.ts
2. Описать модель в /mirage/models/index.ts
3. Создать файл в /mirage/routes/<имя_файла>.ts и описать логику обработки запросов. Затем импортировать в /mirage/routes/index.ts
4. Добавить новые данные в функцию seeds в файле /mirage/index.ts