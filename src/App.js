import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Route exact path="/" component={Main} />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
