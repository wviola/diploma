import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ForumPage } from '../pages/ForumPage';

export class PageFactory {
    public readonly page: Page;
    public readonly homePage: HomePage;
    public readonly forumPage: ForumPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.forumPage = new ForumPage(this.page);
    }
}