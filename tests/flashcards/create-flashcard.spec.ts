// spec: .github/prompts/generate_tests.prompt.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import StudentHomePage from '../../pages/StudentHomePage';
import LessonViewerPage from '../../pages/LessonViewerPage';
import FlashcardsFrame from '../../pages/FlashcardsFrame';

test.use({ storageState: '.auth/session-data.json' });

test.describe('Flashcards', () => {
  test('Create a flashcard', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.impersonateUser();

    const studentHomePage = new StudentHomePage(page);
    const lessonViewerTab = new LessonViewerPage(await studentHomePage.openSection());
    await lessonViewerTab.openFlachcardsFromLesson();

    const flashcards = new FlashcardsFrame(lessonViewerTab.page);
    await flashcards.waitForFlashcardsToLoaded();

    const question = `What is the capital of France? ${Date.now()}`;

    await test.step('1. Starting from the open Flashcards drawer, select U2 - Biochemistry and click Add card', async () => {
      // 1. Starting from the open Flashcards drawer, select the parent unit and click Add card.
      await flashcards.flashcardsFrame.getByRole('button', { name: 'U2 L2 - The Building Blocks of Life' }).click();
      await flashcards.flashcardsFrame.getByRole('menuitem', { name: 'U2 - Biochemistry', exact: true }).click();
      await flashcards.addCard.click();
    });

    await test.step('2. Fill in the front/question field with: "What is the capital of France?"', async () => {
      // 2. Fill in the front/question field with: "What is the capital of France?"
      await flashcards.flashcardQuestion.fill(question);
    });

    await test.step('3. Fill in the back/answer field with: "Paris"', async () => {
      // 3. Fill in the back/answer field with: "Paris"
      await flashcards.flashcardAnswer.fill('Paris');
    });

    await test.step('4. Click Save / Create.', async () => {
      // 4. Click Save / Create.
      await flashcards.flashcardSave.click();
    });

    const createdCard = flashcards.flashcardsFrame.getByText(question, { exact: true });
    const cardContainer = createdCard.locator('..');
    await expect(createdCard).toBeVisible();
    await expect(cardContainer.getByText('Paris', { exact: true })).toBeVisible();

    await test.step('Cleanup: delete only the card created by this test', async () => {
      // Cleanup: delete only the card created by this test.
      await cardContainer.getByRole('button', { name: 'Delete Card' }).click();
      await expect(createdCard).toHaveCount(0);
    });
  });
});
