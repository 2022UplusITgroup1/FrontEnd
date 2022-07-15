import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main/Main";
import List from "./pages/List/List";
import Detail from "./pages/Detail/Detail";
import Order from "./pages/Order/Order";
import Inquiry from "./pages/Inquiry/Inquiry";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Modal from "react-modal";
import Result from "./pages/Inquiry/Result";
import Search from "./pages/Search/Search";
import OrderResult from "./pages/Order/OrderResult";

function App() {
  return (
    <ChakraProvider>
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
          <Route exact path="/detail/:ph_code" component={Detail} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/inquiry" component={Inquiry} />
          <Route exact path="/inquiry-result" component={Result} />
          <Route exact path="/order-result" component={OrderResult} />
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

Modal.setAppElement("#root");

export default App;
