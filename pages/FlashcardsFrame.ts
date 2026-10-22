import { Locator, FrameLocator, Page } from "@playwright/test";

const iframeSelector =
    'iframe[title="Course Study Tool - AI-powered learning assistant for course content"]';

export default class FlashcardsFrame {
    readonly page: Page;
    readonly iframeElement: Locator;
    readonly flashcardsFrame: FrameLocator;
    readonly flashcardsDrawerCloseButton: Locator;
    readonly myCards: Locator;
    readonly pearsonCards: Locator;
    readonly viewAll: Locator;
    readonly addCard: Locator;
    readonly deleteCard: Locator;
    readonly editorClose: Locator;
    readonly flashcardQuestion: Locator;
    readonly flashcardAnswer: Locator;
    readonly flashcardSave: Locator;
    readonly totalQuestions: Locator;
    readonly editFlashcard: Locator;
    readonly flashcardsTile: Locator;
    readonly practiceButton: Locator;
    readonly revelaAnswerButton: Locator;
    readonly nailedItButton: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iframeElement = page.locator(iframeSelector);
        this.flashcardsFrame = page.frameLocator(iframeSelector);
        this.myCards = this.flashcardsFrame.getByRole('button', { name: 'My cards' });
        this.pearsonCards = this.flashcardsFrame.getByRole('button', { name: 'Pearson cards' });
        this.viewAll = this.flashcardsFrame.getByRole('button', { name: 'View All' });
        this.addCard = this.flashcardsFrame.getByRole('button', { name: 'Add card' });
        this.deleteCard = this.flashcardsFrame.getByRole('button', { name: 'Delete Card' });
        this.editorClose = this.flashcardsFrame.getByRole('button', { name: 'Close' });
        this.totalQuestions = this.flashcardsFrame.getByLabel('Total questions:');
        this.flashcardQuestion = this.flashcardsFrame.getByRole('textbox', { name: 'Question' });
        this.flashcardAnswer = this.flashcardsFrame.getByRole('textbox', { name: 'Answer' });
        this.flashcardSave = this.flashcardsFrame.getByRole('button', { name: 'Save' });
        this.editFlashcard = this.flashcardsFrame.getByRole('button', { name: 'Edit Test' });
        this.flashcardsDrawerCloseButton = this.flashcardsFrame.locator('#close-icon-button')
        this.flashcardsTile = this.flashcardsFrame.getByRole('button', { name: 'Flashcards' });
        this.practiceButton = this.flashcardsFrame.getByRole('button', { name: 'Practice' })
        this.revelaAnswerButton = this.flashcardsFrame.getByRole('button', { name: 'Reveal answer' })
        this.finishButton = this.flashcardsFrame.getByRole('button', { name: 'Finish' })
        this.nailedItButton = this.flashcardsFrame.getByRole('button', { name: 'Nailed it:' });

    }

    async waitForFlashcardsToLoaded() {
        await this.iframeElement.waitFor();
        await this.myCards.waitFor();
        await this.pearsonCards.click();
    }
}
// page.getByRole('button', { name: '4' })
// page.locator('div').filter({ hasText: '100%LearnedNailed it: 1Almost' }).nth(5)
// page.getByRole('tab', { name: 'Matching' })
// page.getByRole('button', { name: 'Practice' })
// page.getByLabel('Close')
// page.getByRole('tab', { name: 'Flashcards' })