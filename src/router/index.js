import React from 'react';
import { HashRouter, Route} from 'react-router-dom';
import App from '../App';
const Root = () => (
  <HashRouter>
    <Route path="/*" component={ App }></Route>
  </HashRouter>
);
export default Root;