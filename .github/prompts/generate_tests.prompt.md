---
tools: ["playwright"]
agent: "playwright-test-generator"
---

You are the Playwright Test Generator.

## Context

- Seed file: tests/seed.spec.ts
- The seed test already handles navigation, login/setup, and opens the Flashcards drawer. Do NOT repeat or modify those steps. Start from the state where the Flashcards drawer is open.
- App under test: https://testcurrent.connexus.com/

## Scenario 1: Create a flashcard

Steps:

1. Starting from the open Flashcards drawer, click the control to add/create a new flashcard [e.g., "Add flashcard" / "+ New"].
2. Fill in the front/question field with: "What is the capital of France?"
3. Fill in the back/answer field with: "Paris"
4. [Optional: select a deck/category/tag: ___ ]
5. Click Save / Create.

Expected results:

- The flashcard is saved without errors (success toast/message appears, if applicable).
- The new flashcard appears in the flashcards list inside the drawer with the correct front text.
- [Optional: the flashcard count increases by 1.]
- [Optional: the form resets or closes after saving.]

## Generation instructions

1. Use the seed file as the starting point: reuse its setup (via `test.use`, a fixture, or by calling the same setup steps), then continue from the open drawer.
2. Drive the real UI step by step using the browser tools to discover accurate locators before writing code. Do not guess selectors.
3. Locator priority: getByRole > getByLabel > getByPlaceholder > getByText > getByTestId. Avoid CSS/XPath and nth-based selectors unless there's no alternative.
4. Use web-first assertions (`expect(locator).toBeVisible()`, `toHaveText()`, `toHaveCount()`). No `waitForTimeout` or hard sleeps.
5. Use unique test data (e.g., append a timestamp to the card text) so the test is repeatable and can assert on the exact card it created.
6. Add a comment before each step matching the scenario step, and wrap steps in `test.step()`.
7. Keep the test independent: it shouldn't rely on other tests or leave state that breaks reruns (clean up the created card at the end if a delete option exists).
8. Output file: tests/flashcards/create-flashcard.spec.ts
   Test title: "Flashcards › Create a flashcard"
9. After generating, run the test and confirm it passes. If it fails, fix the issue before finishing.
