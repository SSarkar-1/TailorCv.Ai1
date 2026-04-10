## Chat Notes - 2026-04-05

### Frontend / UI changes

- Updated the optimization flow on the solutions page.
- When the user clicks `Confirm & Generate PDF`, the result box opens immediately.
- Added a loading state before the final download button appears.
- Added a progress bar with percentage updates during resume generation.
- Improved the progress behavior so it keeps moving more naturally instead of visibly stopping at `90%`.

Files changed:
- `static/main_new.js`
- `static/style2.css`

### CSS cleanup

- Cleaned repeated CSS in `static/style2.css`.
- Removed exact duplicate blocks first.
- Then removed older repeated sections while keeping the more modified/newer versions.

File changed:
- `static/style2.css`

### Template / styling discussion

- Checked `template6.html` styling source.
- Confirmed `template6.html` uses stylesheet placeholder logic.
- Bound `template6` to a fixed stylesheet in backend rendering.
- Set `template6` to always use `style3.css` in the resume-template CSS folder.

File changed:
- `main.py`

### Template image / preview discussion

- Checked the template 6 preview image issue.
- Confirmed preview uses `pic6.jpg`.
- Confirmed the preview image exists in `static/pic6.jpg`.
- Confirmed `template6.html` itself does not contain an image tag.

### Authentication system added

- Added real authentication instead of frontend-only demo login.
- Added signup page and signup API.
- Added login page and login API.
- Added password hashing.
- Added SQLite local database support.
- Later made database config PostgreSQL-ready for Render using `DATABASE_URL`.

Files added:
- `database.py`
- `models.py`
- `auth.py`
- `schemas.py`
- `templates/signup.html`

Files updated:
- `main.py`
- `templates/login.html`
- `requirements.txt`
- `render.yaml`

### Database / deployment setup

- Local mode:
  - uses `users.db`
- Production / Render mode:
  - uses `DATABASE_URL` if set
  - PostgreSQL-ready

Important notes:
- `users.db` is fine for local development.
- For Render production, PostgreSQL is the correct long-term database.

### Password hashing fix

- Fixed auth crashes caused by bcrypt/passlib issues in the local environment.
- Switched hashing scheme to `pbkdf2_sha256`.

File changed:
- `auth.py`

### Forgot password flow - version 1

- Implemented initial forgot-password system with reset tokens and reset links.
- Added pages and backend routes for forgot/reset password.

Files added:
- `templates/forgot_password.html`
- `templates/reset_password.html`

Files updated:
- `main.py`
- `models.py`
- `schemas.py`
- `templates/login.html`

### Forgot password flow - version 2

- Replaced reset-link flow with email-code / OTP style flow.
- Now forgot password works like this:
  - user enters email
  - backend generates 6-digit code
  - code is emailed if SMTP is configured
  - otherwise local testing shows the code on screen
  - user enters email + code + new password on reset page
  - password is updated if code is valid

Files updated:
- `main.py`
- `schemas.py`
- `templates/forgot_password.html`
- `templates/reset_password.html`

### Local testing / troubleshooting notes

- Local server should be started with:
  - `python -m uvicorn main:app --reload`
- The project uses the local virtual environment when running with:
  - `.\.venv\Scripts\Activate.ps1`
- Early signup failures came from backend package/runtime issues, not from the HTML forms.
- Verified that missing package issues produced `Internal Server Error`, which then caused frontend JSON parse errors.
- Verified the auth/database path using the project `.venv` Python.

### Bcrypt / passlib problem and final hashing choice

- Encountered a `bcrypt` / `passlib` compatibility problem in the local environment.
- Errors included bcrypt backend loading problems and password length issues.
- Final fix:
  - switched password hashing to `pbkdf2_sha256`
- Result:
  - hashing works
  - verification works
  - user insert path works

File changed:
- `auth.py`

### Forgot-password final behavior

- Final flow now uses a 6-digit verification code instead of reset links.
- Behavior:
  - `/forgot-password` asks for email
  - `/api/forgot-password` creates a 6-digit code
  - code is stored in `password_reset_tokens`
  - code expires in 10 minutes
  - code is marked used after password reset
  - `/reset-password` asks for email + code + new password
  - `/api/reset-password` validates email + code and updates password

### Email sending behavior

- The backend already supports direct email sending for reset codes.
- If SMTP is configured:
  - reset code is sent directly to the user's email
- If SMTP is not configured:
  - local testing fallback shows the code on the page
- This works on a local server too:
  - with SMTP configured, email can go to the real inbox even during local testing
  - without SMTP, code is displayed locally for testing

### Render / production behavior

- Local development:
  - SQLite file: `users.db`
- Production / Render:
  - uses PostgreSQL via `DATABASE_URL`
- Important production note:
  - local `users.db` should not be relied on as a permanent Render production database
  - PostgreSQL is the correct database for Render deployment

### What the website does now

- Real signup is available.
- Real login is available.
- Passwords are stored as hashes, not plain text.
- Forgot-password is available.
- Reset-password with 6-digit email code is available.
- Users can recover access without knowing the old password.
- Direct email sending is possible after SMTP setup.

### User questions and decisions from today

- User wanted:
  - exact file list of changes
  - progress bar in the optimize-resume panel
  - numeric percentage progress
  - more realistic progress behavior
  - CSS duplicate cleanup with minimal risk
  - real login/signup system
  - Render/PostgreSQL-ready database setup
  - forgot-password flow
  - email-code reset flow instead of reset link
  - notes from today's work saved in the repo

### Current auth-related routes in the app

- `GET /login`
- `GET /signup`
- `GET /forgot-password`
- `GET /reset-password`
- `POST /api/signup`
- `POST /api/login`
- `POST /api/forgot-password`
- `POST /api/reset-password`

### SMTP / email behavior

- Current code already supports direct email sending for password reset codes.
- To actually send email in local/production, SMTP env vars must be configured.
- Without SMTP:
  - local testing fallback shows the reset code on screen
- With SMTP:
  - code goes directly to user email inbox

Expected environment variables:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `SMTP_FROM_EMAIL`

### Main app behavior after today’s changes

- Users can sign up.
- Users can log in.
- Users are stored in DB.
- Users can use forgot-password.
- Users can reset password using email code.
- Local dev uses `users.db`.
- Deployment can use PostgreSQL via `DATABASE_URL`.

### Main files touched today

- `main.py`
- `static/main_new.js`
- `static/style2.css`
- `requirements.txt`
- `render.yaml`
- `database.py`
- `models.py`
- `auth.py`
- `schemas.py`
- `templates/login.html`
- `templates/signup.html`
- `templates/forgot_password.html`
- `templates/reset_password.html`
- `CHAT_NOTES_2026-04-05.md`
