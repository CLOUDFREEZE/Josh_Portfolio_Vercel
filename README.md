# Josh Henrick Catchillar — Portfolio

A React + Vite portfolio built from Josh's resume, styled around a
systems-diagnostic / QA test-suite concept (fitting, since he's a QA and
Cloud-focused IT grad).

## Run it locally

```bash
npm install
npm run dev
```

Open the local URL VS Code/terminal prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → Add New Project → import the repo.
3. Vercel auto-detects Vite. Build command: `npm run build`, output dir: `dist`.
4. Click Deploy.

## Things to personalize before publishing

- Swap the placeholder location in `src/components/Contact.jsx` if you want
  a more specific address shown (currently trimmed to city-level for privacy).
- Add a real headshot: drop an image into `public/` and reference it in
  `Hero.jsx` if you'd like a photo alongside the terminal panel.
- Add project cards if you build QA/cloud projects later — a `Projects.jsx`
  component following the same `panel` pattern would slot in easily between
  Skills and Experience.
