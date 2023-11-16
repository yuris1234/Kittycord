import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Splash from "./components/Splash";
import Channels from "./components/Channels";
import DmsIndex from "./components/DmsIndex";

function App() {
  return (
    <>
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
        <Route path="/dms">
          <DmsIndex />
        </Route>
      </Switch>
    </>
  );
}

export default App;
