import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const DATA_ROOT = './data';

const app = express();

app.use((req, res, next) => {
  console.log('url:', req.url);
  next();
})

app.use(express.static('.'))

app.get('/data-file-names', async (req, res) => {
  const names = await fs.promises.readdir(DATA_ROOT)
  res.json(names);
});

app.get('/data-files/:filename', async (req, res) => {
  const filename = req.params.filename
  const content = await fs.promises.readFile(path.resolve(DATA_ROOT, filename), 'utf8')
  res.json(content);
});

// app.get('/:name', (req, res) => {
//   const name = req.params.name;
//   res.send(`Hello, ${name}`);
// });

app.listen(3000, () => {
  console.log('listen on http://localhost:3000')
});
