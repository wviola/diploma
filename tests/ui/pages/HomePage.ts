import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    public readonly page: Page;
    private readonly headerTitle: Locator;
    private readonly catalogLink: Locator;
    private readonly newsLink: Locator;
    private readonly carLink: Locator;
    private readonly houseLink: Locator;
    private readonly servicesLink: Locator;
    private readonly marketLink: Locator;
    private readonly forumLink: Locator;
    private readonly currencyValue: Locator;
    private readonly searchButton: Locator;
    private readonly searchInput: Locator;
    private readonly newsDropdownMenu: Locator;
    private readonly firstNewsCategory: Locator;
    private readonly carDropdownMenu: Locator;
    private readonly firstCarCategory: Locator;
    private readonly homeDropdownMenu: Locator;
    private readonly firstHomeCategory: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerTitle = page.locator('.header-style__top .header-style__title');
        this.catalogLink = page.locator('.b-main-navigation li:first-child .b-main-navigation__text');
        this.newsLink = page.locator('.b-main-navigation li:nth-child(2) .b-main-navigation__text');
        this.carLink = page.locator('.b-main-navigation li:nth-child(3) .b-main-navigation__text');
        this.houseLink = page.locator('.b-main-navigation li:nth-child(4) .b-main-navigation__text');
        this.servicesLink = page.locator('.b-main-navigation li:nth-child(5) .b-main-navigation__text');
        this.marketLink = page.locator('.b-main-navigation li:nth-child(6) .b-main-navigation__text');
        this.forumLink = page.locator('.b-main-navigation li:nth-child(7) .b-main-navigation__text');
        this.currencyValue = page.locator('.top-informer-currency span');
        this.searchButton = page.locator('#fast-search');
        this.searchInput = page.locator('input.fast-search__input');
        this.newsDropdownMenu = page.locator('#container .b-main-navigation__item_active');
        this.firstNewsCategory = page.locator('a.b-main-navigation__dropdown-title-link', { hasText: 'Люди' });
        this.carDropdownMenu = page.locator('#container .b-main-navigation__dropdown_visible');
        this.firstCarCategory = page.locator('a.b-main-navigation__dropdown-title-link', { hasText: 'Автобарахолка' });
        this.homeDropdownMenu = page.locator('#container .b-main-navigation__dropdown_visible');
        this.firstHomeCategory = page.locator('a.b-main-navigation__dropdown-title-link', { hasText: 'Продажа' });
    }

    public async navigate(): Promise<void> {
        await this.page.goto('/',
            { waitUntil: 'domcontentloaded' });
    }

    public async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    public async getHeaderText(): Promise<string | null> {
        return this.headerTitle.textContent();
    }

    public async clickCatalogLink(): Promise<void> {
        await this.catalogLink.click();
    }

    public async clicknewsLink(): Promise<void> {
        await this.newsLink.click();
    }
    public async clickCarsLink(): Promise<void> {
        await this.carLink.click();
    }

    public async clickHouseLink(): Promise<void> {
        await this.houseLink.click();
    }

    public async clickServicesLink(): Promise<void> {
        await this.servicesLink.click();
    }

    public async clickMarketLink(): Promise<void> {
        await this.marketLink.click();
    }

    public async clickForumLink(): Promise<void> {
        await this.forumLink.click();
    }

    public async getCurrencyValue(): Promise<string | null> {
        await expect(this.currencyValue).toBeVisible();
        return this.currencyValue.textContent();
    }

    public async clickSearchButton(): Promise<void> {
        await expect(this.searchButton).toBeVisible();
        await this.searchButton.click();
        await expect(this.searchInput).toBeVisible();
    }

    public async isSearchInputVisibleAndEnabled(): Promise<boolean> {
        const isVisible = await this.searchInput.isVisible();
        const isEnabled = await this.searchInput.isEnabled();
        return isVisible && isEnabled;
    }

    public async hoverOnNewsLink(): Promise<void> {
        await this.newsLink.hover();
        await expect(this.newsDropdownMenu).toBeVisible();
        await expect(this.firstNewsCategory).toBeVisible();
    }

    public async getNewsCategoriesText(): Promise<string[]> {
        return this.firstNewsCategory.allTextContents();
    }

    public async getNewsCategoriesLinks(): Promise<Locator> {
        return this.firstNewsCategory;
    }

    public async hoverOnCarLink(): Promise<void> {
        await this.carLink.hover();
        await expect(this.carDropdownMenu).toBeVisible();
        await expect(this.firstCarCategory).toBeVisible();
    }

    public async getCarCategoriesText(): Promise<string[]> {
        return this.firstCarCategory.allTextContents();
    }

    public async getCarCategoriesLinks(): Promise<Locator> {
        return this.firstCarCategory;
    }
    public async hoverOnHouseLink(): Promise<void> {
        await this.houseLink.hover();
        await expect(this.homeDropdownMenu).toBeVisible();
        await expect(this.firstHomeCategory).toBeVisible();
    }

    public async getHouseCategoriesText(): Promise<string[]> {
        return this.firstHomeCategory.allTextContents();
    }

    public async getHouseCategoriesLinks(): Promise<Locator> {
        return this.firstHomeCategory;
    }
}