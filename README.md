# Free Graduate Academic Advising Support System

A frontend-only prototype of a graduate academic advising platform for universities. The application demonstrates how authoritative academic information can help graduate students understand degree progress, plan courses, track milestones, and prepare for better-informed advising conversations.

This system complements, not replaces, guidance from faculty advisors.

## Features

- Landing page and demo login for Student, University Administration, Dean / Registrar, and IT / Maintenance roles
- Student dashboard with GPA, credit progress, academic standing, assistantship eligibility, roadmap, milestones, academic health, course explorer, and advising transparency
- Course planner with multiple valid pathways and neutral recommendation language
- Administration portal for editing fictional course, faculty, and degree requirement data
- Dean / Registrar portal for course review, assessment transparency, and faculty assignment workflows
- IT / Maintenance portal with demo system status, logs, backups, notifications, and configuration views
- Global search across courses, faculty, programs, milestones, and announcements
- LocalStorage persistence for selected demo edits
- Responsive layout for desktop, tablet, and mobile
- GitHub Pages deployment workflow

## Technology Stack

- React
- Vite
- JavaScript
- CSS
- React Router
- lucide-react icons
- Local JavaScript data and localStorage

No backend, database, authentication provider, API keys, scraping, or external services are required.

## Project Structure

```text
src/
  data/
    seedData.js
  utils/
    storage.js
  main.jsx
  styles.css
.github/workflows/deploy.yml
index.html
package.json
vite.config.js
```

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

The production build is generated in `dist/`.

## Deploy to GitHub Pages

This repository includes `.github/workflows/deploy.yml`.

1. Push the project to a GitHub repository.
2. In repository settings, enable GitHub Pages with GitHub Actions as the source.
3. Push to the `main` branch.
4. The workflow installs dependencies, runs `npm run build`, and deploys `dist/`.

Routing uses `HashRouter`, and Vite is configured with `base: './'`, so direct GitHub Pages deployment works without server rewrites.

## Demo Accounts

- Student: `student@demo.edu`
- University Admin: `admin@demo.edu`
- Dean / Registrar: `registrar@demo.edu`
- IT / Maintenance: `it@demo.edu`

Any password is represented by the demo screen. Use **Continue as Demo User**.

## Fictional Data Notice

All universities, departments, faculty, courses, students, records, logs, and academic indicators are fictional representative demo data. No real student information is used, and no fictional statistics should be interpreted as real institutional statistics.

## Future Roadmap

- Real institutional authentication and role permissions
- Registrar-approved data integrations
- Degree audit rule engine
- Advisor review workflows
- Student-specific course planning with validated catalog rules
- Accessibility and usability testing with real university stakeholders
- Backend persistence, audit logs, and administrative approval workflows
