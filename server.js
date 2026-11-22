import express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(root, 'dist');
const port = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.static(distDir, { extensions: ['html'] }));

app.use((req, res) => {
  if (existsSync(join(distDir, 'index.html'))) {
    res.status(404).send('Not found');
  } else {
    res.status(503).send('Site not built yet. Run npm run build.');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
