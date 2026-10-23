# Flashcards UI Exploration

## Setup and navigation

- `tests/seed.spec.ts` opens the lesson viewer in a new tab, opens the Flashcards drawer, and leaves the drawer loaded. The current seed now brings the lesson tab to the front and closes the original home tab.
- The Flashcards drawer is inside the iframe titled `Course Study Tool - AI-powered learning assistant for course content`.
- The initial scope is the current lesson, `U2 L2 - The Building Blocks of Life`. The scope selector opens a menu containing the course (`Biology A`), units, and lessons.
- Selecting the parent unit (`U2 - Biochemistry`) exposes `Add card`. Selecting the course (`Biology A`) with no Pearson deck exposes `Create your own`. Both controls open the card editor. `View All` opens the full card panel; at the course scope, the panel includes the Question and Answer editor beneath the existing card list.
- At the course scope, the drawer also shows `My cards`, `View All`, `Flashcards` and `Matching` tabs, a total-question count, and `Practice`.

## UI elements and recommended locators

Use `page.frameLocator('iframe[title="Course Study Tool - AI-powered learning assistant for course content"]')` to reach these elements:

| Element                | Recommended locator                                                    | Notes                                                   |
| ---------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| Current scope selector | `getByRole('button', { name: 'U2 L2 - The Building Blocks of Life' })` | Opens the scope menu                                    |
| Parent unit scope      | `getByRole('menuitem', { name: 'U2 - Biochemistry', exact: true })`    | Selects the unit containing the current lesson          |
| Course scope           | `getByRole('menuitem', { name: 'Biology A', exact: true })`            | Selects course-level scope                              |
| Add card               | `getByRole('button', { name: 'Add card' })`                            | Available at the parent-unit scope                      |
| Create your own        | `getByRole('button', { name: 'Create your own' })`                     | Opens the editor at the course scope                    |
| View all               | `getByRole('button', { name: 'View All' })`                            | Opens the card list panel                               |
| Question               | `getByRole('textbox', { name: 'Question' })`                           | 400-character maximum; remaining-character status shown |
| Answer                 | `getByRole('textbox', { name: 'Answer' })`                             | 400-character maximum; remaining-character status shown |
| Save                   | `getByRole('button', { name: 'Save' })`                                | Disabled until both fields contain text                 |
| Cancel                 | `getByRole('button', { name: 'Cancel' })`                              | Disabled until both fields contain text                 |
| Close card panel       | `getByRole('button', { name: 'Close' })`                               | Closes/reopens the panel with unsaved fields cleared    |
| Delete a card          | `getByRole('button', { name: 'Delete Card' })`                         | Appears on each user-created card                       |

## Observed behavior

### Create and save

- At the parent-unit scope, `Add card` opens the editor. At the course scope, `Create your own` also opens the editor when no Pearson deck is available.
- Both Question and Answer are required for Save to become enabled. Save is disabled when both fields are blank, when only the question is filled, and when only the answer is filled.
- Saving adds the card to the panel, clears the editor fields, and leaves the panel open. No success toast was observed.
- The new card displays the entered question and answer and provides its own `Delete Card` button.
- The question and answer counters start at 400 characters. A 305-character question left 95 characters remaining.

### Input edge cases

- HTML-like tags in input were displayed as plain text without the tags; punctuation, ampersands, accented characters, and emoji remained visible.
- A second card with the same front text and a different answer was accepted. Duplicate front text is therefore allowed.
- Cancel clears both fields and leaves the editor panel open.
- Closing and reopening the card panel also cleared unsaved values.

## Test coverage and page object

- The existing `FlashcardsFrame` page object already exposes the iframe, Question and Answer fields, Save, Cancel, View All, and Delete Card locators.
- Its `addCard` locator is not the observed entry point from the seeded lesson scope. The flow observed here is to select `Biology A` from the scope menu and click `Create your own`.
- A helper for selecting a scope and a helper for opening `Create your own` would make the page object reflect this flow. No page-object changes were made during this exploration.
- The create-card test is at `tests/flashcards/create-flashcard.spec.ts` and uses the parent-unit `Add card` route. The configured run failed in existing `auth.setup.ts` waiting for the username textbox; a run that bypassed setup then failed waiting for the `Demo Impersonation` link before reaching the card flow.
