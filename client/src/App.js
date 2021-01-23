import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import OrderHistory from "./pages/OrderHistory";
import React from "react";
import Signup from "./pages/Signup";
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              <Route exact path='/success' component={Success} />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
