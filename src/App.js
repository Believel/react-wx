import React from 'react';
import { Route} from 'react-router-dom';

import Report from './views/report/index';
const setTitle = (title) => document.title = title;
function App() {
  return (
    <>
      <Route path="/" exact component={Report}/>
      <Route path="/report" component={Report} onEnter={setTitle('学习报告')}></Route>
    </>
  );
}

export default App;