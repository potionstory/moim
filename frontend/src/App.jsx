import React, { memo } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Create from './pages/Create';

const App = memo(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail/:category/:id" component={Detail} />
          <Route path="/create" component={Create} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
});

export default App;
