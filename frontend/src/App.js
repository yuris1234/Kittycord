import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Splash from "./components/Splash";
import Channels from "./components/Channels";
// import DmsIndex from "./components/DmsIndex";
// import Modal from "./components/Modal";
import DmsIndex from "./components/DmsIndex/DmsIndex.js";
import Modal from "./components/Modal/Modal.js"
import { NavLink } from "react-router-dom/cjs/react-router-dom.js";
import Server from "./components/Servers/index.js";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Splash />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/">
          <Switch>
          <div className="channel-container">
            <div className="server-container"> 
              <NavLink className="server-icon-wrapper" to="/channels" activeClassName="active-link">
                  <div className="server-tab">
                      <span className="server-tab-icon"></span>
                  </div>
                  <img className="server-icon" src="https://capycord.onrender.com/static/media/icon.544887f99d55e652be72.png"/>
              </NavLink>
              <div className="server-divider"></div>
              <NavLink className="server-icon-wrapper" to="/servers/1" activeClassName="active-link">
                  <div className="server-tab">
                      <span className="server-tab-icon"></span>
                  </div>
                  <img className="server-icon" src="https://capycord.onrender.com/static/media/icon.544887f99d55e652be72.png"/>
              </NavLink>
          </div>
          <Route path="/channels">
            <Channels />
          </Route>
          <Route path="/servers/:id">
            <Server />
          </Route>
          </div>
        </Switch>
        </Route>
      </Switch>
    </>
  );
}

export default App;
