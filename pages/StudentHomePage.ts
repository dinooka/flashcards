import { Locator, Page } from "@playwright/test";
import users from "../test-data/users.json";

export default class StudentHomePage {
	readonly page: Page;
	readonly myCoursesTab: Locator;

	constructor(page: Page) {
		this.page = page;
		this.myCoursesTab = page.locator('//a[text()="My Courses"]');
	}
	readonly bioSection = (sectionName: string): Locator =>
		this.page.locator(`//a[contains(text(),'${sectionName}')]`);

	async openSection() {
		await this.myCoursesTab.waitFor();
		await this.myCoursesTab.click();
		const newTab = this.page.context().waitForEvent('page');
		await this.bioSection(users.section).click();
		const newPage = await newTab;
		await newPage.waitForLoadState();
		return newPage;
	}
}
