import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import StudentHomePage from '../pages/StudentHomePage';
import LessonViewerPage from '../pages/LessonViewerPage';
import FlashcardsFrame from '../pages/FlashcardsFrame';

test.use({ storageState: ".auth/session-data.json" });

test('Open Flashcards', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.impersonateUser();

  const studentHomePage = new StudentHomePage(page);
  const newPage = await studentHomePage.openSection();

  const lessonViewerTab = new LessonViewerPage(newPage);
  await lessonViewerTab.openFlachcardsFromLesson();

  const flashcards = new FlashcardsFrame(newPage);
  await flashcards.waitForFlashcardsToLoaded();

});
