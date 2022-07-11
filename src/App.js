import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Route exact path="/" component={Main} />
      </Router>
    </div>
  );
}

export default App;
