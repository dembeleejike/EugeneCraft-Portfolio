# EugeneCrafts Portfolio

## Structure

```
src/
  portfolio.jsx   → all UI/layout code (rarely needs editing)
  data.js         → all real content: profile, skills, projects (edit this)
  main.jsx        → renders portfolio.jsx into the page
  index.css       → Tailwind imports
project-generator.html → open in any browser to generate new data.js entries
```

## Setup (already done in this zip — just run it)

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Updating content

Open `src/data.js` and edit directly, OR open `project-generator.html`
in your browser, fill in the form, and paste the generated code into
the matching array in `data.js`.

## Deploying

```bash
npm run build
```

This produces a `dist/` folder. Drag it into Netlify, or connect this
folder/repo to Vercel, for a live URL.

## TODOs before it's fully "you"

Open `src/data.js` and fill in every field marked `TODO`:
email, GitHub/LinkedIn URLs, resume link, photo, location, education,
and the live/repo links for StoryXverse, CodeCraft and other projects.
