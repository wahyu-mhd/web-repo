# Portfolio content guide

## Where things live

- Homepage: `src/app/page.tsx`.
- Shared name, contact, social links and credentials: `src/data/profile.ts`.
- Project metadata: `src/data/projects.ts`. Cards, page headers, SEO and sitemap use this list.
- Project articles: `content/projects/<slug>.md`.
- Authoring template: `content/projects/_template.md` (never published).
- Photographs: `public/photography/`, with entries in `src/data/photos.ts`.
- Existing portrait, CV, SOC screenshots and Google verification asset remain in `public/`.

## Add a project

1. Add an entry in `src/data/projects.ts`: unique slug, title, shortDescription, category, technologies, motif, featured, writeupPending.
2. Copy `content/projects/_template.md` to match that slug.
3. Write verified content outside the HTML comment. Only projects in the metadata list receive routes.
4. Set `writeupPending: false` when the article is ready. Optional `links.github`, `links.demo` and `links.live` create real links only when supplied.
5. Optional cover: `{ src: '/projects/example/cover.webp', alt: 'Describe the image', width: 1600, height: 900 }`.
6. Run `npm run check` and `npm run build`.

## Write an article

Use ordinary Markdown. The page already supplies the h1. Use `##` for sections and `###` for subsections. Lists, GFM tables, inline code, fenced code blocks, links and blockquote callouts are supported.

Prefer stable anchors: `## Tools and prerequisites {#requirements}`. Renaming the heading will then preserve the URL. Otherwise anchors are generated from the heading text; duplicates get numeric suffixes. The contents includes visible h2–h6 headings, including setext headings, and ignores fenced code.

Hide unfinished sections in `<!-- authoring comments -->`. Comments are stripped before rendering and do not appear in the contents or response. Do not store secrets in content files, including comments.

Fenced code blocks have a copy button. Blockquotes render as callouts. Tables scroll within the article on narrow screens.

## Insert project media

Put local assets under `public/projects/<slug>/`.

- Image or diagram: `![A useful description](/projects/example/diagram.webp)`. Dimensions are read on the server and Next Image supplies responsive optimisation. Include a text explanation of diagrams.
- Video: `[video: Demonstration caption](/projects/example/demo.mp4)`. WebM also works. Videos use native controls and do not autoplay.
- For a video with speech, add a WebVTT caption file as the Markdown link title: `[video: Demonstration](/projects/example/demo.mp4 "/projects/example/demo.vtt")`. Also provide a transcript or equivalent nearby text.
- Raw HTML is intentionally disabled. Use Markdown instead. Remote images render as links; download authorised assets into public before embedding.
- The optional cover belongs in project metadata. Do not invent screenshots or use illustrations as proof of a working interface.

## Add photographs

Only add your actual photographs. The public gallery is empty until you do.

1. Save an appropriately sized JPEG, WebP or AVIF under `public/photography/`.
2. Add an entry to the `photos` array in `src/data/photos.ts`:
   `{ id: 'unique-id', src: '/photography/your-file.webp', alt: 'Describe the actual scene', width: 1600, height: 1067 }`.
3. Use the actual intrinsic dimensions. Optional fields: caption, location, date, camera. Omit unknown metadata.
4. Array order is gallery order. Image proportions are preserved; Next Image provides responsive sizes and lazy loading.
5. The viewer supports previous/next, arrow keys, Escape, modal focus containment and focus restoration.

## Modes, motion and navigation

Engineering lives at `/`; Photography lives at `/photography`. The mode switch deliberately uses ordinary document links with CSS `@view-transition { navigation: auto; }`. This uses the native cross-document View Transition API without enabling experimental React features. Browsers without support navigate normally; reduced motion disables transitions and smooth scrolling. Shared identity stays fixed during the short crossfade. Regular project navigation uses Next Link.

## Preserved integrations

Contact uses the existing Resend server action, sender and destination, with `RESEND_API_KEY` and optional `CONTACT_EMAIL`. No credentials are stored in source. A failed provider response now produces an error rather than a false success. Test delivery deliberately; automated UI checks do not send mail.

Robots, Google verification, favicon, social URLs and the résumé route are preserved. Project routes keep the existing SOC and CI/CD slugs. Sitemap includes both modes and all projects. The public résumé is updated from the supplied CV; the previous file is preserved at `public/resume-previous.pdf`.

## Factual items to resolve

- ChunkVault / SafeVault retains the CV naming pending a final public name.
- CyberSoc's organisation heading starts June 2025, but its subcommittee role starts January 2025. The website displays the role-specific dates, without inventing a combined start date.
- The CV uses both Tech Specialist Executive and Tech Specialist Lead. The website uses the title in its Experience section: Tech Specialist Executive.
- Existing website Rust and Terraform claims are not supported by this CV and were removed.
- Expected graduation, internship availability, project dates, repository/demo URLs, detailed decisions and results need your input.
- CV metrics are not used as decorative counters. Add measurement context before expanding them in case studies.
