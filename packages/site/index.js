/**
 * Vendor
 */

const micro = require('micro');
const next = require('next');

const { router, get } = require('microrouter');

/**
 * Settings
 */

const port = parseInt(process.env.PORT, 10) || 2001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Server
 */

app
  .prepare()
  .then(() => {

  micro(
    router(
      get('/sections/:slug', (req, res) => {
        const { slug } = req.params;
        app.render(req, res, '/sections', { slug });
      }),

      get('/page/:slug', (req, res) => {
        const { slug } = req.params;
        app.render(req, res, '/page', { slug });
      }),

      get('/courses/:slug', (req, res) => {
        const { slug } = req.params;
        app.render(req, res, '/courses', { slug });
      }),

      get('*', (req, res) => handle(req, res)),
    ),
  ).listen(port);
})
