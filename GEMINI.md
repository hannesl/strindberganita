# Project Instructions: strindberganita.se

This is a static one-page website built with Gulp, Handlebars, and Sass.

## Tech Stack & Workflow
- **Node Version:** 20 (as defined in `mise.toml`).
- **Build Tool:** Gulp 4 (`./node_modules/.bin/gulp`).
- **Content:** `src/data.yml` (Source of truth for events/walks).
- **Styling:** Sass (using `compass-importer` and Dart Sass).
- **Deployment:** `bash deploy.sh` (Requires `s3cmd`).

## Development Guidelines
- **Build Target:** All generated files go to `dist/`. Never edit files in `dist/` directly.
- **Dependency Management:** Use `yarn` for managing dependencies.
- **Sass:** Be aware that `compass-mixins` are used; ignore deprecation warnings from that library during build.

## Annual Content Update Workflow
The website is updated annually based on a script provided as a PDF or document.
When asked to perform an update:
1. Check the template content to replace references to last year with the current year.
2. **Parse Input:** Carefully extract dates, times, titles, and descriptions from the provided document.
3. **Update Data:** Modify `src/data.yml`. Maintain the existing YAML structure:
   - `walks`: List of walking tours.
   - `excursions`: List of excursions.
   - `dates`: Nested list within each event containing `date` (YYYY-MM-DD) and `time`.
   - `walks` and `excursions` items should be sorted by their first date.
4. **Validate Build:** After updating `data.yml`, run `./node_modules/.bin/gulp template` to ensure the HTML compiles correctly.
5. **Verify Output:** Check `dist/index.html` to confirm the new content is rendered as expected.
