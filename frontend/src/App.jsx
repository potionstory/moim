import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Create from './pages/Create';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
