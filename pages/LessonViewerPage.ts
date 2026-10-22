import { Locator, FrameLocator, Page } from "@playwright/test";
import users from "../test-data/users.json";

const iframeSelector =
	'iframe[title="Lesson Content"]';

export default class LessonViewerPage {
	readonly page: Page;
	readonly courseOutlineButton: Locator;
	readonly flashcardsButton: Locator;
	readonly iframeElement: Locator;
	readonly lessonFrame: FrameLocator;
	readonly nextPageButton: Locator;


	constructor(page: Page) {
		this.page = page;
		this.courseOutlineButton = page.getByRole('button', { name: 'Course Outline' });
		this.flashcardsButton = page.getByRole('button', { name: 'Flashcards' });
		this.iframeElement = page.locator(iframeSelector);
		this.lessonFrame = page.frameLocator(iframeSelector);
		this.nextPageButton = this.lessonFrame.locator('svg.rightArrow');
	}
	readonly lessonButton = (lname: string): Locator =>
		this.page.getByRole('button', { name: lname });

	async openFlachcardsFromLesson() {
		await this.courseOutlineButton.click();
		await this.lessonButton(users.lesson).click();
		await this.iframeElement.waitFor();
		await this.nextPageButton.waitFor();
		await this.flashcardsButton.click();
	}
}