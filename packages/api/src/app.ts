/**
 * Vendor
 */

import fs from 'fs';
import path from 'path';
import cors from 'micro-cors';
import compose from 'micro-compose';
import mongoose from 'mongoose';

import { send } from 'micro';
import { router, get, post } from 'microrouter';
import { ServerRequest, ServerResponse } from 'microrouter';

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

import {
  lessonsController,
  questionsController,
  pagesController,
  coursesController,
  sectionsController,
  usersController,
  organizationsController,
  postsController,
  settingsController,
} from './controllers';

const notfound = (
  _req: ServerRequest, res: ServerResponse
) => send(res, 404, 'You shall not passs :)');

/**
 * Expo
 */

export default compose(
  cors,
)(router(
  /** PAGES **/
  get('/pages', pagesController.index),
  get('/pages/:slug', pagesController.show),
  post('/pages/create', pagesController.create),
  post('/pages/update', pagesController.update),
  post('/pages/delete', pagesController.destroy),

  /** COURSES **/
  get('/courses', coursesController.index),
  get('/courses/:id', coursesController.show),
  post('/courses/create', coursesController.create),
  post('/courses/update', coursesController.update),
  post('/courses/delete', coursesController.destroy),

  /** LESSONS **/
  get('/lessons', lessonsController.index),
  get('/lessons/:id', lessonsController.show),
  post('/lessons/create', lessonsController.create),
  post('/lessons/update', lessonsController.update),
  post('/lessons/delete', lessonsController.destroy),

  /** QUESTIONS **/
  get('/questions/:id', questionsController.index),
  post('/questions/create', questionsController.create),
  post('/questions/update', questionsController.update),
  post('/questions/delete', questionsController.destroy),

  /** SECTIONS **/
  get('/sections', sectionsController.index),
  get('/sections/:slug', sectionsController.show),
  post('/sections/create', sectionsController.create),
  post('/sections/update', sectionsController.update),
  post('/sections/delete', sectionsController.destroy),

  /** USERS **/
  get('/users', usersController.index),
  get('/users/info/:id', usersController.info),
  post('/users/create', usersController.create),
  post('/users/update', usersController.update),
  post('/users/delete', usersController.destroy),
  post('/users/login', usersController.login),

  /** POSTS **/
  get('/posts', postsController.index),
  get('/posts/:id', postsController.show),
  post('/posts/create', postsController.create),
  post('/posts/update', postsController.update),
  post('/posts/delete', postsController.destroy),

  /** SETTINGS **/
  get('/settings', settingsController.index),
  post('/settings/create', settingsController.create),
  post('/settings/update', settingsController.update),
  post('/settings/delete', settingsController.destroy),

  /** ORGANIZATIONS **/
  get('/organizations', organizationsController.index),
  get('/organizations/employers', organizationsController.employers),
  post('/organizations/create', organizationsController.create),
  post('/organizations/login', organizationsController.login),

  /** 404 **/
  get('/*', notfound),
));
