# Backend Template

A concise, consistent structure and conventions to follow for all backend services.

## Project Structure

Recommended layout:

- /src
  - /controllers # request handlers
  - /services # business logic
  - /models # database schemas / ORM models
  - /routes # API route definitions
  - /middlewares # express/koa middleware
  - /config # configuration (env-based)
  - /utils # small reusable helpers
  - /tests # unit & integration tests
- /scripts # helper scripts (db migrations, seeds)
- .env.example # sample environment variables
- package.json
- README.md
- Dockerfile
- .gitignore

## Conventions

- Use environment variables for configuration; keep secrets out of repo and include an `.env.example`.
- Keep controllers thin; put business logic in services.
- Use async/await and centralized error handling middleware.
- Validate and sanitize incoming requests (e.g., using Joi or Zod).
- Use consistent logging (structured JSON) and avoid console.log in production.
- Return consistent API responses: { success: boolean, data: any, error?: { message, code } }.
- Follow semantic versioning for releases and document breaking changes in CHANGELOG.

## Development

- Install: `npm install` or `yarn`
- Run: `npm run dev` (watch + restart)
- Build: `npm run build`
- Start: `npm start`
- Test: `npm test`
- Lint: `npm run lint`

## Testing

- Prefer small, fast unit tests and a few integration tests for critical flows.
- Use a separate test database or an in-memory DB.

## Deployment

- Build artifact should be deterministic and environment-configured.
- Use Docker for consistent environments; keep Dockerfile simple and secure.

## Notes

- Keep README updated with run/build instructions specific to each service.
- Keep service-specific docs (routes, env expectations) close to the code in a docs/ or README.md in the service folder.
