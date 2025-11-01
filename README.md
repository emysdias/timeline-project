# Timeline

A **React-based timeline** component with **compact lanes**, **drag/resize support**, **inline editing**, and a **monthly ruler**.
Items are packed into **space-efficient horizontal lanes**: if `A.end < B.start`, they share the same lane.
The packing also includes a **label relaxation** so that long names or short durations don’t cause visual overlaps.

---

## Installation & Running

```bash
npm install
npm start
npm test
```

---

## Running tests

```bash
npm run test
```

---


## Docker

This project also supports **Docker** for easy setup without installing dependencies locally.

**Run with Docker Compose:**

```bash
docker-compose up --build
```

Then open your browser at:

```
http://localhost:1234
```

**Why Docker?**

* Ensures the app runs in a consistent environment.
* No need to install Node.js or other dependencies on your machine.
* Easy to share with other developers or deploy.

---

## Video

[Screencast from 2025-08-08 20-11-22.webm](https://github.com/user-attachments/assets/ed48bb77-bd99-460a-9f53-e2dfa16adbe1)

---

## What I Like About This Implementation

* **Clean separation** between utility functions and UI components.
* **Lane packing algorithm** that minimizes vertical space while keeping items readable.
* **Pure CSS styling** for predictable rendering without heavy styling frameworks.
* Modular **`utils/`** functions with isolated unit tests, making them easy to maintain.

---

## What I Would Change If Doing It Again

* Add **accessibility features** like keyboard navigation for moving and resizing items.

---

## How I Made My Design Decisions

* Looked at **Airtable’s timeline view** and **Gantt charts** for inspiration.
* Chose a **lane packing approach** instead of fixed rows to save space and reduce scrolling.
* Used **minimal dependencies** to keep the bundle small and easy to run anywhere.

---

## Figma

[Low-fidelity prototype](https://www.figma.com/proto/ufLjFz4dbyjWCJxooIkijH/timeline-project?node-id=2-2&p=f&t=XpOi2l2w3xywuPyZ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1)

---

## Notes about tests included

This branch adds a small, focused test suite to help catch logic regressions early:

- Unit tests for utility modules (examples: `dateUtils`, `geometry`, `packLanes`, `updaters`) are in `tests/utils`.
- A snapshot-style test for the output of `computeLayout` is under `tests/snapshots` to detect structural layout regressions.
- A light integration test exercises moving and resizing via `makeUpdateById` and verifies `computeLayout` updates accordingly (`tests/utils/moveAndLayout.test.js`).

Run tests locally with:

```bash
npm run test
```

These tests are intentionally small and fast; they give quick feedback before adding heavier visual snapshots or E2E suites.