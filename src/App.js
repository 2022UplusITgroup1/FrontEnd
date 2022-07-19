import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import List from "./pages/List/List";
import Detail from "./pages/Detail/Detail";
import Order from "./pages/Order/Order";
import OrderResult from "./pages/Order/OrderResult";
import Inquiry from "./pages/Inquiry/Inquiry";
import Result from "./pages/Inquiry/Result";
import Search from "./pages/Search/Search";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Route exact path="/" component={Main} />
          <Route
            exact
            path="/mobile/5g-phone"
            component={() => <List category="5G" />}
          />
          <Route
            exact
            path="/mobile/4g-phone"
            component={() => <List category="4G" />}
          />
          <Route
            exact
            path="/mobile/detail/:net_sp/:pl_code/:ph_code/:color/:dc_type"
            component={Detail}
          />
          <Route exact path="/mobile/order" component={Order} />
          <Route exact path="/mobile/search" component={Search} />
          <Route exact path="/mobile/inquiry" component={Inquiry} />
          <Route exact path="/mobile/inquiry-result" component={Result} />
          <Route exact path="/mobile/order-result" component={OrderResult} />
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
