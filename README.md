# Academic Navigator

Academic Navigator is a frontend-only pilot of a graduate academic decision-support layer for universities.

Universities built systems to record a student's journey. Academic Navigator helps the student navigate it.

## Product Model

University systems answer: "What has happened, and what can you do?"

Academic Navigator answers: "Given everything we know, what should you consider doing next?"

The application is designed to sit above existing university systems of record such as student-information systems, degree audit, registrar systems, course catalogs, learning-management systems, graduate education, financial aid, and assistantship records.

## Features

- University sign-in flow with editable institution, username, and password fields
- Student dashboard that interprets academic records into personalized next actions
- Three student records across different academic stages, departments, programs, and constraints
- Profile verification flow using capitalized academic information labels
- Recommendation evidence view showing the basis for each course recommendation
- Course comparison using requirement fit, research fit, course health, workload, and graduation impact
- Course quality indicators derived from student reviews, peer assessment of teaching, and departmental appraisal
- Institution administration view for connected university data systems
- Dean / Registrar workflows for curriculum, assessment, faculty assignment, and audit review
- IT operations views for system status, logs, backups, notifications, and configuration
- Browser persistence for selected edits
- Responsive layout for desktop, tablet, and mobile

## Pilot Data And Integration Notice

The pilot uses simulated institutional APIs modeled on the data structures and integration points of university student-information, degree-audit, registrar, course-catalog, LMS, financial-aid, assistantship, and graduate-education systems. Production deployment would replace these adapters with institution-authorized APIs or data integrations.

The decision engine is intended to remain the same when moving from the pilot data layer to a production integration layer.

## Architecture

```text
Student
  |
Academic Navigator
  |
Academic Decision Engine
  |
Integration Layer
  |
Student Records / Degree Requirements / Course Catalog / Registrar / LMS / Financial Aid / Graduate Education
  |
University Systems
```

## Technology Stack

- React
- Vite
- JavaScript
- CSS
- React Router
- lucide-react icons
- Local JavaScript data and localStorage

No backend, database, authentication provider, API keys, scraping, or external services are required for the pilot.

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

## Deploy To GitHub Pages

This repository includes `.github/workflows/deploy.yml`.

1. Push the project to a GitHub repository.
2. In repository settings, enable GitHub Pages with GitHub Actions as the source.
3. Push to the `main` branch.
4. The workflow installs dependencies, runs `npm run build`, and deploys `dist/`.

Routing uses `HashRouter`, and Vite is configured with `base: './'`, so direct GitHub Pages deployment works without server rewrites.

## Future Roadmap

- Institution-authorized authentication and role permissions
- Production university integration adapters
- Registrar-approved degree audit rule engine
- Advisor and graduate coordinator review workflows
- Student planning inputs for career goals, research interests, workload preferences, internships, and personal constraints
- Accessibility and usability testing with university stakeholders
- Backend persistence, audit logs, and administrative approval workflows
