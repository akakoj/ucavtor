/**
 * Dependencies
 */

const fs       = require('fs');
const path     = require('path');
const cors     = require('micro-cors')();
const compose  = require('micro-compose');
const mongoose = require('mongoose');

const { send } = require('micro');
const { router, get, post } = require('microrouter');

/**
 * DataBase
 */

mongoose.connect('mongodb://localhost/ucavtor');
mongoose.Promise = global.Promise;

/**
 * Models require
 */

fs.readdirSync(path.join(__dirname, '/models')).forEach((file) => {
  if (file.includes('.js')) {
    require(path.join(__dirname, '/models/', file));
  }
});

/**
 * Routes
 */

const lessonsController       = require('./controllers/lessonsController');
const questionsController     = require('./controllers/questionsController');
const pagesController         = require('./controllers/pagesController');
const coursesController       = require('./controllers/coursesController');
const paymentsController      = require('./controllers/paymentsController');
const sectionsController      = require('./controllers/sectionsController');
const usersController         = require('./controllers/usersController');
const organizationsController = require('./controllers/organizationsController');
const postsController         = require('./controllers/postsController');
const settingsController      = require('./controllers/settingsController');

const notfound = (req, res) => send(res, 404, 'You shall not passs :)')

/**
 * Expo
 */

module.exports = compose(
  cors
)(router(
  /** PAGES **/
  get('/pages',            pagesController.index),
  get('/pages/:slug',      pagesController.show),
  post('/pages/create',    pagesController.create),
  post('/pages/update',    pagesController.update),
  post('/pages/delete',    pagesController.delete),

  /** COURSES **/
  get('/courses',          coursesController.index),
  get('/courses/:id',      coursesController.show),
  post('/courses/create',  coursesController.create),
  post('/courses/update',  coursesController.update),
  post('/courses/delete',  coursesController.delete),

  /** LESSONS **/
  get('/lessons',          lessonsController.index),
  get('/lessons/:id',      lessonsController.show),
  post('/lessons/create',  lessonsController.create),
  post('/lessons/update',  lessonsController.update),
  post('/lessons/delete',  lessonsController.delete),

  /** QUESTIONS **/
  get('/questions/:id',      questionsController.index),
  post('/questions/create',  questionsController.create),
  post('/questions/update',  questionsController.update),
  post('/questions/delete',  questionsController.delete),
  
  /** SECTIONS **/
  get('/sections',         sectionsController.index),
  get('/sections/:slug',   sectionsController.show),
  post('/sections/create', sectionsController.create),
  post('/sections/update', sectionsController.update),
  post('/sections/delete', sectionsController.delete),

  /** USERS **/
  get('/users',            usersController.index),
  get('/users/info/:id',   usersController.info),
  post('/users/create',    usersController.create),
  post('/users/update',    usersController.update),
  post('/users/delete',    usersController.delete),
  post('/users/login',     usersController.login), 

  /** POSTS **/
  get('/posts',            postsController.index),
  get('/posts/:id',        postsController.show),
  post('/posts/create',    postsController.create),
  post('/posts/update',    postsController.update),
  post('/posts/delete',    postsController.delete),

  /** SETTINGS **/
  get('/settings',         settingsController.index),
  post('/settings/create', settingsController.create),
  post('/settings/update', settingsController.update),
  post('/settings/delete', settingsController.delete),

  /** PAYMENTS **/
  get('/payments',         paymentsController.index),
  get('/payments/check',   paymentsController.check),
  post('/payments/create', paymentsController.create),
  post('/payments/update', paymentsController.update),

  get('/payments/:id',     paymentsController.show),


 /** ORGANIZATIONS **/
  get('/organizations',           organizationsController.index),
  get('/organizations/employers', organizationsController.employers),
  post('/organizations/create',   organizationsController.create),
  post('/organizations/login',    organizationsController.login),
  
  /** 404 **/
  get('/*', notfound)
));
