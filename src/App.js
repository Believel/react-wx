import React from 'react';
import { Route} from 'react-router-dom';

import Report from './views/report';
import Record from './views/record';
const setTitle = (title) => document.title = title;
function App() {
  return (
    <>
      <Route path="/" exact component={Record}/>
      <Route path="/report" component={Report} onEnter={setTitle('学习报告')}></Route>
      <Route path="/record" component={Record} onEnter={setTitle('录制')}></Route>
    </>
  );
}

export default App;