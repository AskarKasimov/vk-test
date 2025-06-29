# Демо бесконечной таблицы

Веб-приложение на React + TypeScript + Vite для отображения и управления таблицей книг с возможностью бесконечной
прокрутки, добавления новых книг и обновления данных.

## Запуск

Всё по-классике через докер, env `VITE_API_URL` - это адрес API.

```
git clone https://github.com/AskarKasimov/vk-test
cd vk-test
VITE_API_URL=http://localhost:3001 docker compose up --build
```

В качестве API используется [json-server](https://github.com/typicode/json-server) и исправно поднимается в
Docker-Compose.

База данных находится в ./db/db.json

## Основной нструментарий

- **TanStack Query v5** — кэширование и пагинация
- **Zod** — валидация данных
- **React Modal** — модальные окна
- **SCSS** — стилизация (модульная)
- **React Toastify** — тосты
- **Vitest** — модульные тесты

## Структура проекта

```
├── entities/
│   └── book/
│       ├── queries.ts         # Хуки useCreateBook и useGetInfinityBooks
│       ├── adapter.ts         # Адаптация BookDTO -> Book
│       ├── schema.ts          # Zod-схема -> BookDTO
│       └── types.ts           # Book (типы, с которыми работает приложение)
├── features/
│   ├── BooksTable/            # Компонент главной таблицы с книгами
│   └── CreateBookModal/       # модальное окно для загрузки книги на API
├── shared/
│   ├── api/                   # API-эндпоинты
│   └── ui/                    # Общие внеконтекстные компоненты
```

## Стейт-менеджер

В проекте не используется какой-либо стейт-менеджер, так как построенная исходя из поставленной задачи архитектура
приложения такова, что я не вижу нужды в хранении глобального состояния.
