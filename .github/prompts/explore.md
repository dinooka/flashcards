You are the Playwright Test Planner. EXPLORE the live app in a visible (headed) browser and report what you observe. Do not write test code yet.

## Setup

Run tests/seed.spec.ts first via the planner setup tool (planner_setup_page). The seed does this:

1. HomePage.navigate() and impersonateUser()
2. StudentHomePage.openSection() -> this OPENS A NEW TAB
3. LessonViewerPage.openFlachcardsFromLesson() on the new tab
4. FlashcardsFrame.waitForFlashcardsToLoaded()

IMPORTANT:

- After the seed finishes, the Flashcards drawer is open in the NEW TAB, not the original tab. List the open tabs (browser_tabs) and switch to the newest one before doing anything.
- The flashcards UI is likely inside an iframe. Inspect the snapshot for the frame and interact with elements inside it. Note the iframe's identifying attribute (title, name, or id) so locators can use frameLocator().
- Do NOT repeat any seed steps. Start from the loaded flashcards drawer.
- If the browser isn't visible or the tab switch fails, STOP and tell me.

## Exploration goal

Explore the flashcards drawer. Work live, one action at a time, narrating each step in chat first: "Step N: doing X because Y". Pause briefly between actions so I can watch.

1. Snapshot and describe what's visible (existing cards, empty state, buttons, counts).
2. Click the view all button to create a flashcard. Snapshot and list every field, dropdown, toggle, and button, with labels, placeholders, and required markers.
3. Happy path: fill question & answer with unique data (e.g., "Test Q <timestamp>" / "Test A <timestamp>") and save. Observe toast, form reset/close, list update, and count change.
4. Edge cases (snapshot after each):
   - All fields empty
   - Only front filled
   - Only back filled
   - Very long text
   - Special characters, emoji, HTML-like input (<b>test</b>)
   - Duplicate front text
   - Cancel/close midway, then reopen (is the data kept or cleared?)

## Rules

- Use only browser tools. Take labels and locators from snapshots, never from memory.
- Only touch cards you create. Do not edit or delete existing ones.
- For each key element, note the best locator (role/label first) AND whether it sits inside the iframe.
- If something unexpected happens, stop, describe it, and continue.

## Output

1. UI elements with recommended locators, including how to reach the frame.
2. Observed behavior for the happy path and each edge case (what to assert on).
3. Proposed scenarios saved to specs/flashcards.md.
4. Whether the existing FlashcardsFrame page object already covers these elements, or which methods are missing (e.g., clickAddFlashcard, fillFront, fillBack, save, getCardByText).
