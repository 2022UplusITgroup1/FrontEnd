import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import List from "./pages/List/List";
import Detail from "./pages/Detail/Detail";
import Order from "./pages/Order/Order";
import "./App.css";
//test

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Route exact path="/" component={Main} />
          <Route
            exact
            path="/5g-phone"
            component={() => <List category="5G" />}
          />
          <Route
            exact
            path="/4g-phone"
            component={() => <List category="4G" />}
          />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/order" component={Order} />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
