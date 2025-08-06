# 🎓 Дипломный проект по автоматизации тестирования  
## **Jest**
## **Jest + superAgent**
## **Playwright + TypeScript**  

![Playwright](https://img.shields.io/badge/Framework-Playwright-green)  
![JavaScript](https://img.shields.io/badge/Language-TypeScript-blue) 
![Jest](https://img.shields.io/badge/Test--Runner-Jest-C21325)
![SuperAgent](https://img.shields.io/badge/HTTP--Client-SuperAgent-lightgrey)
![Allure](https://img.shields.io/badge/Report-Allure-blue)  

Этот проект содержит автотесты, разработанные с использованием:
**Playwright (TS)** для проверки функциональности интернет-портала [Интернет-портал Onliner](https://www.onliner.by/), **Jest + superAgent(TS)** для тестирования интернет-страницы [Интернет-страница](https://jsonplaceholder.typicode.com/) и **Jest** для проверки функциональности класса 'Регистрационная форма'

---

## 📌 Содержание

- [📋 Чек-лист тестов](#cases)  
- [🛠️ Стек технологий](#stack)  
- [⚙️ Подготовка к запуску](#setup)  
- [🚀 Запуск автотестов](#autotests)  
- [📊 Генерация Allure-отчетов](#generateAllureReport)  
- [📑 Пример Allure-отчета](#allureReport)  
- [👤 Автор](#author)

---

<a id="cases"></a>

## 📋 Чек-лист автоматизированных тестов

💻 UI чек-лист:
- Главная страница:

✅ Проверка заголовка и основного текста страницы.

✅ Проверка отображения информации о курсе валют со знаком '$'.

✅ Проверка видимости и доступности поля поиска.

✅ Навигация по основным разделам сайта: "Каталог", "Новости", "Автобарахолка", "Дома и квартиры", "Услуги", "Барахолка", "Форум".

- Проверка выпадающих меню (hover):

✅ Меню "Новости": проверка отображения категорий.

✅ Меню "Автобарахолка": проверка отображения категорий.

✅ Меню "Дома и квартиры": проверка отображения категорий. 

- Страница "Форум":
✅ Проверка успешного перехода на страницу "Форум" и её заголовка.

✅ Проверка наличия и видимости основных разделов форума (Important, Technologies, Auto Onliner и др.).

✅ Проверка наличия хотя бы одной темы в списке.


💻 API чек-лист:

✅ GET Получение данных (посты, задачи, пользователи, комментарии)

✅ POST Создание записей (посты, задачи, с вариациями полей)

✅ PUT Полное обновление постов и задач

✅ PATCH Частичное обновление постов и задач

✅ DELETE Удаление записей (включая edge-cases: строка/отрицательный ID)

---

<a id="stack"></a>

## 🛠️ Стек технологий

- [Playwright](https://playwright.dev/) – фреймворк для тестирования UI и API
- [Jest](https://jestjs.io/) – фреймворк для юнит- и API-тестирования
- [SuperAgent](https://github.com/ladjs/superagent) – клиент для HTTP-запросов, используется для API-тестирования
- [Node.js](https://nodejs.org/) – среда выполнения JavaScript  
- [Allure Report](https://docs.qameta.io/allure/) – система отчетности  
- [npm](https://www.npmjs.com/) – менеджер пакетов  


---
<a id="setup"></a>

## ⚙️ Подготовка к запуску

1️⃣ Установить Node.js (версия 22+) с [официального сайта](https://nodejs.org/)  
2️⃣ Склонировать проект  
3️⃣ Локально установить все необходимые пакеты

---

<a id="autotests"></a>

## 🚀 Запуск автотестов

Запуск UI тестов
```bash
npm run test:ui
```

Запуск API тестов
```bash
npm run test:api
```

Запуск UNIT тестов
```bash
npm run test:unit
```

---

<a id="generateAllureReport"></a>

## 📊 Генерация Allure отчетов

```bash
npm run test:allure
```

---

<a id="allureReport"></a>

## 📑 Пример Allure отчета 

![Allure-report](images/allure.png)

---

<a id="author"></a>

## 👤 Автор

wviola

