import { Page, Locator, expect } from '@playwright/test';

export class ForumPage {
    public readonly page: Page;
    private readonly forumHeader: Locator;
    private readonly importantSection: Locator;
    private readonly technologiesSection: Locator;
    private readonly autoOnlinerSection: Locator;
    private readonly moneySection: Locator;
    private readonly stateSection: Locator;
    private readonly offlineSection: Locator;
    private readonly marketSection: Locator;
    private readonly discussionSection: Locator;
    private readonly firstTopicInList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.forumHeader = page.locator('.m-title');
        this.importantSection = page.locator('.h-hottopics h2', { hasText: 'Важное' });
        this.technologiesSection = page.locator('.b-hdtopic > h2', { hasText: 'Технологии' });
        this.autoOnlinerSection = page.locator('.b-hdtopic > h2', { hasText: 'Аuto Onliner' });
        this.moneySection = page.locator('.b-hdtopic > h2', { hasText: 'Деньги' });
        this.stateSection = page.locator('.b-hdtopic > h2', { hasText: 'Недвижимость' });
        this.offlineSection = page.locator('.b-hdtopic > h2', { hasText: 'Offline' });
        this.marketSection = page.locator('.b-hdtopic > h2', { hasText: 'Барахолка' });
        this.discussionSection = page.locator('.b-hdtopic > h2', { hasText: 'Обсуждение товаров в каталоге' });
        this.firstTopicInList = page.locator('.h-hottopics li:nth-child(1) h3 a');
        this.firstTopicInList = page.locator('.h-hottopics li:nth-child(2) h3 a');
        this.firstTopicInList = page.locator('.h-hottopics li:nth-child(3) h3 a');
        //b-hdtopic
    }

    public async getForumTitleText(): Promise<string | null> {
        await expect(this.forumHeader).toBeVisible();
        return this.forumHeader.textContent();
    }

    public async isImportantSection(): Promise<boolean> {
        await expect(this.importantSection).toBeVisible();
        return this.importantSection.isVisible();
    }

    public async isTechnologiesSection(): Promise<boolean> {
        await expect(this.technologiesSection).toBeVisible();
        await expect(this.technologiesSection).toContainText('Технологии');
        return this.technologiesSection.isVisible();
    }

    public async isAutoOnlinerSection(): Promise<boolean> {
        await expect(this.autoOnlinerSection).toBeVisible();
        return this.autoOnlinerSection.isVisible();
    }

    public async isMoneySection(): Promise<boolean> {
        await expect(this.moneySection).toBeVisible();
        return this.moneySection.isVisible();
    }

    public async isStateSection(): Promise<boolean> {
        await expect(this.stateSection).toBeVisible();
        return this.stateSection.isVisible();
    }

    public async isOfflineSection(): Promise<boolean> {
        await expect(this.offlineSection).toBeVisible();
        return this.offlineSection.isVisible();
    }

    public async isMarketSection(): Promise<boolean> {
        await expect(this.marketSection).toBeVisible();
        return this.marketSection.isVisible();
    }
    public async isDiscussionSection(): Promise<boolean> {
        await expect(this.discussionSection).toBeVisible();
        return this.discussionSection.isVisible();
    }

    public async isAnyTopicVisible(): Promise<boolean> {
        await expect(this.firstTopicInList).toBeVisible();
        return this.firstTopicInList.isVisible();
    }

    public async technologiesSectionTitle(): Promise<boolean> {
        await expect(this.technologiesSection).toContainText('Авто');
        return this.technologiesSection.isVisible();
    }
}
