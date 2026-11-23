# Absence Tracker
This is a small React + TypeScript SPA that lists BrightHR absences, along with conflict indications.
## Features
- Table: start, end, employee, approval status, type
- Sort by start date, employee name, absence type (click headers; click again to reverse)
- Conflict badge via `/api/conflict/:id`
- Click an employee's name to show their absences
## Run
prerequisites: Node 20+
```bash
npm install
npm run dev
```
## Test
```bash
npm test
```
(or `npm test -- --run` for a single CI-style pass)

## Given more time:
- Component tests (RTL) for table sorting + conflict badge
- Conflict fetching: batching, better loading/error UI
- Accessibility (aria-sort, etc.)
- Improve the general styling and layout, perhaps adding some transition animation
- Wider test coverage
## API
- `GET https://front-end-kata.brighthr.workers.dev/api/absences`
- `GET https://front-end-kata.brighthr.workers.dev/api/conflict/{id}`