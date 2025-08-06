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
    }

    public async getForumTitleText(): Promise<string | null> {
        await this.forumHeader.isVisible();
        return this.forumHeader.textContent();
    }

    public async isImportantSection(): Promise<boolean> {
        await expect(this.importantSection).toBeVisible();
        return this.importantSection.isVisible();
    }

    public async isTechnologiesSection(): Promise<boolean> {
        return this.technologiesSection.isVisible();
    }

    public async isAutoOnlinerSection(): Promise<boolean> {
        return this.autoOnlinerSection.isVisible();
    }

    public async isMoneySection(): Promise<boolean> {
        return this.moneySection.isVisible();
    }

    public async isStateSection(): Promise<boolean> {
        return this.stateSection.isVisible();
    }

    public async isOfflineSection(): Promise<boolean> {
        return this.offlineSection.isVisible();
    }

    public async isMarketSection(): Promise<boolean> {
        return this.marketSection.isVisible();
    }
    public async isDiscussionSection(): Promise<boolean> {
        return this.discussionSection.isVisible();
    }

    public async isAnyTopicVisible(): Promise<boolean> {
        return this.firstTopicInList.isVisible();
    }
}
