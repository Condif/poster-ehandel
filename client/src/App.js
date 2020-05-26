import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './components/Main';
// import Login from './components/Login';
// import Register from './components/Register';
// import UserOrders from './components/UserOrders';
// import Checkout from './components/Checkout';
// import ProductView from './components/ProductView';
// import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
            {/* 
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/category" component={CategoryPage} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/orders" component={UserOrders} />
             */}


          </Switch>
        </Layout>
      </div>
    </Router>
  );
}


const slugURL = (string) => {
  string = string.replace(/^\s+|\s+$/g, ''); // trim
  string = string.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  string = string.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return string;
}

export default App;
