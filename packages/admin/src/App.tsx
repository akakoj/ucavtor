/*!
 * Vendor
 */

import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

/*!
 * Containers
 */

import Login         from './containers/login';
import Home          from './containers/home';
import Courses       from './containers/courses';
import Lessons       from './containers/lessons';
import Questions     from './containers/questions';
import Sections      from './containers/sections';
import Pages         from './containers/pages';
import Users         from './containers/users';
import Posts         from './containers/posts';
import Settings      from './containers/settings';
import Organizations from './containers/organizations';

/**
 * Expo
 */

const App = () => (
  <Switch>
    <Route exact path="/"        component={Home} />
    <Route exact path="/login"   component={Login} />
    <Route path="/users"         component={Users} />
    <Route path="/pages"         component={Pages} />
    <Route path="/lessons"       component={Lessons} />
    <Route path="/courses"       component={Courses} />
    <Route path="/questions"     component={Questions} />
    <Route path="/sections"      component={Sections} />
    <Route path="/organizations" component={Organizations} />
    <Route path="/posts"         component={Posts} />
    <Route path="/settings"      component={Settings} />
    <Route component={() => (<p>404</p>)} />
  </Switch>
);

export default App;
