import { Locator, Page } from "@playwright/test";
import { env } from "../types/type";
import url from "../test-data/url.json"

export default class LoginPage {
	readonly page: Page;
	readonly username: Locator;
	readonly password: Locator;
	readonly nextButton: Locator;
	readonly acceptCookiesButton: Locator;
	readonly signInButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.username = page.getByRole('textbox', { name: 'Enter username, for example:' });
		this.password = page.getByRole('textbox', { name: 'Password' });
		this.nextButton = page.getByRole('button', { name: 'Next' });
		this.acceptCookiesButton = page.getByRole('button', { name: 'Accept All' })
		this.signInButton = page.getByRole('button', { name: 'Sign in' });
	}

	async userLogin() {
		await this.page.goto(url.loginPageUrl);
		await this.username.fill(env.EMPLOYEE_USERNAME);
		await this.nextButton.click();
		await this.acceptCookiesButton.click();
		await this.password.fill(env.EMPLOYEE_PASSWORD);
		await this.signInButton.click();
	}
}
