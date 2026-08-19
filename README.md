# Academic Navigator

Academic Navigator is a frontend-only pilot of a graduate academic decision-support layer for universities.

Universities built systems to record a student's journey. Academic Navigator helps the student navigate it.

## Product Model

University systems answer: "What has happened, and what can you do?"

Academic Navigator answers: "Given everything we know, what should you consider doing next?"

The application is designed to sit above existing university systems of record such as student-information systems, degree audit, registrar systems, course catalogs, learning-management systems, graduate education, financial aid, and assistantship records.

## Intended Deployment Behavior

In production, Academic Navigator should be deployed as a university-authorized decision-support layer above existing institutional systems. It is not meant to replace MyU, JOESS, SIS, LMS, registrar, degree-audit, HR, financial-aid, graduate-education, or course-catalog systems. Those systems remain the systems of record.

After institutional sign-in, the application should receive authorized student facts from university data integrations:

- Student identity and profile
- Program, college, department, degree level, and catalog year
- Transcript, grades, credits, CGPA, and current enrollment
- Degree requirements, degree-audit status, and remaining credits
- Course catalog, availability, prerequisites, and curriculum review status
- Milestones such as qualifying exams, proposals, capstones, committee formation, annual reviews, and graduation applications
- Assistantship, funding, enrollment-load, and reduced-coursework constraints
- Course quality evidence, including student reviews, peer assessment of teaching, and departmental appraisal

The student should not be asked to manually recreate information the university already knows. Instead, the student verifies imported information and adds intentions the university may not fully know:

- Desired graduation date
- Research interests
- Career goals
- Preferred workload
- Internship plans
- Course preferences
- Personal constraints
- Changes in academic direction

Academic Navigator then interprets facts and intentions to recommend next actions:

- Which course to take next
- Which alternatives preserve graduation timelines
- Which combinations create workload or sequencing risk
- Which milestone should be started now
- Whether assistantship or enrollment constraints affect the plan
- Why a recommendation was produced
- What evidence supports or weakens each option

The recommendation engine should be explainable. Every recommendation should expose its basis, including program requirements, prerequisites, academic history, research-interest alignment, course availability, historical outcomes, recent course review, workload compatibility, and graduation timeline impact.

Dean / Registrar workflows should remain approval workflows. The system can recommend faculty assignment patterns, flag conflicts, and identify high-accountability assessment formats, but official assignments should be made or approved by Dean / Registrar users. For courses with major quizzes, closed-book exams, midterms, or other high-stakes assessments, the product should support separate faculty roles for course instruction, assessment paper creation, evaluation, and moderation/review. This separation improves accountability for instructors, evaluators, and students.

University Administration users should manage institutional configuration, connected data systems, academic rules, course data, faculty records, degree requirements, milestones, and change history. IT / Maintenance users should monitor system health, connected integrations, logs, backups, notifications, and configuration.

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
- Dean / Registrar approval controls for assigning separate faculty to course instruction, assessment paper creation, evaluation, and moderation
- IT operations views for system status, logs, backups, notifications, and configuration
- Browser persistence for selected edits
- Responsive layout for desktop, tablet, and mobile

## Pilot Data And Integration Notice

The pilot uses simulated institutional APIs modeled on the data structures and integration points of university student-information, degree-audit, registrar, course-catalog, LMS, financial-aid, assistantship, and graduate-education systems. Production deployment would replace these adapters with institution-authorized APIs or data integrations.

The decision engine is intended to remain the same when moving from the pilot data layer to a production integration layer.

The pilot demonstrates this production shape with local simulated institutional data. The application UI should behave as though the university has connected its systems; implementation notes about simulated data belong in this README rather than on the application screens.

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

## Pilot User Login Details

Use the following credentials when reviewing the pilot.

| Role | Username | Password |
| --- | --- | --- |
| Student - Alex Morgan | `alex.morgan` | `Navigator2026!` |
| Student - Maya Chen | `maya.chen` | `Navigator2026!` |
| Student - Samir Rahman | `samir.rahman` | `Navigator2026!` |
| University Administration | `admin.navigator` | `Navigator2026!` |
| Dean / Registrar | `registrar.navigator` | `Navigator2026!` |
| IT / Maintenance | `it.navigator` | `Navigator2026!` |

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
