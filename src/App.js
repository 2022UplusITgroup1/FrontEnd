import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Order from "./pages/Order";
import "./App.css";

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
