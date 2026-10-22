import { Locator, Page } from "@playwright/test";
import url from "../test-data/url.json";
import users from "../test-data/users.json";

export default class HomePage {
	readonly page: Page;
	readonly plannerLink: Locator;
	readonly accountDropdownButton: Locator;
	readonly accountSettingsLink: Locator;
	readonly demoImpersonationLink: Locator;
	readonly demoName: Locator;
	readonly impersonateButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.plannerLink = page.getByRole('link', { name: 'Planner' });
		this.accountDropdownButton = page.locator('a.header-menu-item-link.account[aria-haspopup="true"]');
		this.accountSettingsLink = page.locator('a.dropdown-item-link[title="Account Settings"]');
		this.demoImpersonationLink = page.getByRole('link', { name: 'Demo Impersonation' });
		this.demoName = page.getByRole('textbox', { name: 'Enter your demo name,' });
		this.impersonateButton = page.getByRole('button', { name: 'Impersonate' });
	}

	async navigate() {
		await this.page.waitForLoadState();
		await this.page.goto(url.loginPageUrl + url.homePageUrl);
		await this.page.waitForLoadState();
	}

	async openPlanner() {
		await this.plannerLink.click();
	}

	async openAccountSettings() {
		await this.accountDropdownButton.click();
		await this.accountSettingsLink.click();
	}

	async impersonateUser() {
		await this.demoImpersonationLink.click();
		await this.demoName.fill(users.student);
		await this.impersonateButton.click();
	}

}
