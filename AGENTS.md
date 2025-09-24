# Repository Guidelines

## Project Structure & Modules
- Backend API: `src/api/` (Flask, SQLAlchemy, Alembic)
- Web App: `src/web/` (React + TS, Zustand)
- Cook Web (CMS): `src/cook-web/` (Next.js + TS)
- Docker: `docker/` (compose, env examples)
- Tests: `src/api/tests/` and frontend test folders
- Locales: `src/web/public/locales/`, `src/cook-web/public/locales/`

## Build, Test & Development
- Backend dev: `cd src/api && FLASK_APP=app.py flask run`
- Backend tests: `cd src/api && pytest`
- Web dev: `cd src/web && npm install && npm run start:dev`
- Cook Web dev: `cd src/cook-web && npm install && npm run dev`
- Lint/format: root `pre-commit run --all-files`; web `npm run lint`
- Docker up: `cd docker && docker compose up -d`

## Coding Style & Naming
- English-only for code, comments, logs, commits.
- Python: PEP 8; use SQLAlchemy models with indexed business keys (e.g., `user_bid`).
- Frontend: i18n for all UI strings (use translation keys, no hardcoded text).
- Directories: kebab-case (e.g., `user-profile/`). Components: PascalCase (`UserCard.tsx`). Utilities/hooks: kebab-case (`api-client.ts`, `use-auth.ts`).
- Run pre-commit before any commit.

## Testing Guidelines
- Backend: `pytest`; structure under `src/api/tests/` with `test_[module].py`. Use fixtures in `conftest.py`. Target ≥80% coverage (`pytest --cov=flaskr`).
- Frontend: `npm test` where configured; keep tests beside components or in `__tests__`.
- Name tests by behavior: `test_function_scenario`.

## Commit & Pull Requests
- Conventional Commits: `type: short imperative message` (e.g., `feat: add study session endpoints`).
- Before opening a PR: run tests, `pre-commit`, add migrations when models change (`FLASK_APP=app.py flask db migrate -m "msg"`).
- PR checklist: description, linked issue, screenshots for UI, migrations reviewed, no secrets, i18n keys added.

## Security & Configuration
- Do not commit secrets. Use `.env` files:
  - Backend: `src/api/.env` (e.g., `FLASK_APP=app.py`)
  - Web: `src/web/.env` (`REACT_APP_API_URL`)
  - Cook Web: `src/cook-web/.env.local` (`NEXT_PUBLIC_API_URL`)
- Regenerate env examples after config changes: `cd src/api && python scripts/generate_env_examples.py`.
- Prefer business keys over DB FKs; index all `*_bid` columns.

