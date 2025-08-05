import { test, expect, Page, BrowserContext } from '@playwright/test';
import { PageFactory } from '../../factories/PageFactory';

test.describe('Onliner ui elements tests', () => {
    let pages: PageFactory;

    test.beforeEach(async ({ page }: { page: Page }) => {

        pages = new PageFactory(page);
        await pages.homePage.navigate();
    });

    test('should verify the main page title and header text', async () => {
        await expect(pages.homePage.page).toHaveTitle(/Onlíner/);

        const actualHeaderText = await pages.homePage.getHeaderText();
        expect(actualHeaderText).not.toBeNull();
        expect(actualHeaderText).toBe('Onlíner');
    });

    test('should display currency information with "$" sign', async () => {
        const currencyText = await pages.homePage.getCurrencyValue();

        expect(currencyText).toContain('$');
        expect(currencyText).toMatch(/\$\s?\d{1},\d{4}/);
    });

    test('should verify the search input field', async () => {
        await pages.homePage.clickSearchButton();

        const isSearchInputVisibleAndEnabled = await pages.homePage.isSearchInputVisibleAndEnabled();
        expect(isSearchInputVisibleAndEnabled).toBe(true);
    });
});

test.describe.only('Onliner navigation tests', () => {
    let pages: PageFactory;

    test.beforeEach(async ({ page }: { page: Page }) => {

        pages = new PageFactory(page);
        await pages.homePage.navigate();
    });

    test('should navigate to "Каталог"', async ({ page }) => {

        await pages.homePage.clickCatalogLink();
        await expect(page).toHaveURL(/catalog\.onliner\.by/);
    });

    test('should navigate to "Новости"', async ({ page }) => {
        await pages.homePage.clicknewsLink();
        await expect(page).toHaveURL(/onliner\.by/);
    });

    test('should navigate to "Автобарахолка"', async ({ page }) => {
        await pages.homePage.clickCarsLink();
        await expect(page).toHaveURL(/ab\.onliner\.by/);
    });

    test('should navigate to "Дома и квартиры"', async ({ page }) => {
        await pages.homePage.clickHouseLink();
        await expect(page).toHaveURL(/r\.onliner\.by\/pk/);
    });

    test('should navigate to "Услуги"', async ({ page }) => {
        await pages.homePage.clickServicesLink();
        await expect(page).toHaveURL(/s\.onliner\.by\/tasks/);
    });

    test('should navigate to "Барахолка"', async ({ page }) => {
        await pages.homePage.clickMarketLink();
        await expect(page).toHaveURL(/baraholka\.onliner\.by/);
    });

    test('should navigate to "Форум"', async ({ page }) => {
        await pages.homePage.clickForumLink();
        await expect(page).toHaveURL(/forum\.onliner\.by/);
    });
});

test.describe('Onliner dropdown menu tests', () => {
    let pages: PageFactory;

    test.beforeEach(async ({ page }: { page: Page }) => {

        pages = new PageFactory(page);
        await pages.homePage.navigate();
    });

    test('should check a dropdown menu "Новости"', async () => {
        await pages.homePage.hoverOnNewsLink();

        const categoriesText = await pages.homePage.getNewsCategoriesText();
        const categoriesLinks = await pages.homePage.getNewsCategoriesLinks();
        await expect(categoriesLinks).toBeVisible();
        await expect(categoriesLinks).toBeEnabled();
        expect(categoriesText).toContain('Люди');
    });

    test('should check a dropdown menu "Автобарахолка"', async () => {
        await pages.homePage.hoverOnCarLink();

        const carText = await pages.homePage.getCarCategoriesText();
        const carLinks = await pages.homePage.getCarCategoriesLinks();
        await expect(carLinks).toBeVisible();
        await expect(carLinks).toBeEnabled();
        expect(carText).toContain('Автобарахолка');
    });

    test('should check a dropdown menu "Дома и квартиры"', async () => {
        await pages.homePage.hoverOnHouseLink();

        const homeText = await pages.homePage.getHouseCategoriesText();
        const homeLinks = await pages.homePage.getHouseCategoriesLinks();
        await expect(homeLinks).toBeVisible();
        await expect(homeLinks).toBeEnabled();
        expect(homeText).toContain('Продажа');
    });
});
