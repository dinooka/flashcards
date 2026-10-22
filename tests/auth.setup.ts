import { test as setup, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

const userDataFile = ".auth/session-data.json";
const homePageTitle = 'Employee Home Page';


setup("Employee login as Admin", async ({ browser }) => {
	const context = await browser.newContext({
		permissions: []
	});
	const page = await context.newPage();
	const loginPage = new LoginPage(page);
	await loginPage.userLogin();
	await page.waitForURL('**/employee.aspx');
	await expect(page).toHaveTitle(homePageTitle);
	await page.context().storageState({ path: userDataFile });
});