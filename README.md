# My Virtual Classroom

1. Create an activity folder inside `testing/electronics/` or `testing/artificial-intelligence/`. Put an `index.html` and its assets inside. Use relative paths for local assets and use lowercase, hyphen-separated folder names such as `ohms-law`.
2. Open the activity locally and test every interaction. If it uses features such as JavaScript modules or fetch, test it through a local HTTP server.
3. When ready, copy the entire activity folder to the matching subject under `published/`. Check that the folder contains only files you intend students to receive.
4. Run `node build.mjs` and inspect `dist/index.html`. The build requires Node.js and has no package dependencies.
5. Commit the published activity and push to `main`. Once Vercel is connected, each push to `main` updates the production site.

The homepage turns folder names such as `ohms-law` into activity labels. The corresponding student URL is `/published/electronics/ohms-law/`. Drafts stay on your PC by default, and the build reads activities from the two subject folders under `published/` only.

## Vercel Hobby

In your personal Hobby scope, [import the GitHub repository](https://vercel.com/new) and keep the root directory at the repository root. The included `vercel.json` selects the build command and serves only `dist/`. Deploy and share the production `.vercel.app` URL with students.
