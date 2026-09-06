# Redesign verification

## Automated checks

- ESLint: passed.
- TypeScript: passed.
- Content tests: 5 passed (draft stripping, code-fence exclusion, stable and duplicate anchors, heading depth, project loading and traversal rejection).
- Next.js production build: passed; homepage, photography, all three projects, robots and sitemap prerender successfully.

- Production HTTP smoke check: 15 routes/assets returned 200; project anchors were present; drafts were absent; an unknown project and the removed QA route returned 404.

## Local browser checks

- Desktop preview; tablet at 820 px; mobile at 390 px and 320 px.
- Engineering and Photography URLs; current-mode indicator; keyboard Enter activation; browser back and forward.
- Native cross-document crossfade observed. Navigation also tested from an isolated page opting out of transitions.
- Project showcase navigation and all three project pages.
- Desktop contents highlighting; mobile disclosure; click-to-anchor; direct requirements URL and reload; headings land below the header.
- Existing SOC media loads; no broken images found in viewed sections.
- No horizontal overflow on checked layouts.
- Photo enlargement tested with existing SOC assets in a temporary, explicitly labelled local test route, not in the photography portfolio. Verified arrow navigation, previous/next state, Escape, body scroll lock, and focus return to the opening thumbnail. Temporary route removed.
- Code-copy status verified in the temporary route.
- Contact labels, required fields and narrow-screen layout checked without submitting.
- No application console errors observed. Development-only Fast Refresh reload warning occurred during source edits.

## Limits and follow-up

- Actual photographs have not been supplied. The production gallery uses an empty state.
- Detailed write-ups, repository/demo URLs and video assets remain for the owner to supply.
- Live email delivery was not exercised.
- Reduced-motion behaviour is implemented in CSS (transitions and smooth scrolling disabled); the browser's OS motion preference was not changed during testing.
- The transition fallback was checked by opting a document out, not by testing every unsupported browser.
- Existing dependency audit findings remain in the older framework/tooling dependency tree (8 reported: 2 moderate, 6 high). No framework upgrade was bundled into this redesign.
- CV naming/date discrepancies are recorded in CONTENT_GUIDE.md.

