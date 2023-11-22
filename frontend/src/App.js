import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Splash from "./components/Splash";
import Channels from "./components/Channels";
import DmsIndex from "./components/DmsIndex";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      {/* <Modal/> */}
      <Switch>
        <Route exact path="/">
          <Splash />
        </Route>
        <Route path="/channels">
          <Channels />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
