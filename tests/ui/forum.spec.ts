import { test, expect, Page } from '@playwright/test';
import { PageFactory } from '../../factories/PageFactory';

test.describe('Onliner Forum tests', () => {
    let pages: PageFactory;

    test.beforeEach(async ({ page }: { page: Page }) => {
        pages = new PageFactory(page);
        await pages.homePage.navigate();
        await pages.homePage.clickForumLink();
    });

    test('should navigate to "Форум" and verify page title', async () => {
        expect(pages.forumPage.page).toHaveURL(/forum\.onliner\.by/);
        // expect(pages.forumPage.page).toHaveTitle('Форум onliner.by - Главная страница');

        const actualHeaderText = await pages.forumPage.getForumTitleText();

        expect(actualHeaderText).not.toBeNull();
        expect(actualHeaderText).toContain('Форум');
    });
    test('should check "Форум" list', async () => {

        expect(await pages.forumPage.isImportantSection()).toBe(true);
        expect(await pages.forumPage.isTechnologiesSection()).toBe(true);
        expect(await pages.forumPage.isAutoOnlinerSection()).toBe(true);
        expect(await pages.forumPage.isMoneySection()).toBe(true);
        expect(await pages.forumPage.isStateSection()).toBe(true);
        expect(await pages.forumPage.isOfflineSection()).toBe(true);
        expect(await pages.forumPage.isMarketSection()).toBe(true);
        expect(await pages.forumPage.isDiscussionSection()).toBe(true);
        expect(await pages.forumPage.isAnyTopicVisible()).toBe(true);

    });
});