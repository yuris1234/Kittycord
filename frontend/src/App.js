import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Splash from "./components/Splash";
import Channels from "./components/Channel/index.js";
// import DmsIndex from "./components/DmsIndex";
// import Modal from "./components/Modal";
import DmsIndex from "./components/DmsIndex/DmsIndex.js";
import Modal from "./components/Modal/Modal.js"
import { NavLink } from "react-router-dom/cjs/react-router-dom.js";
import Server from "./components/Servers/index.js";
import Channel from "./components/Channel/index.js";
import { useSelector } from "react-redux";
import ServerNav from "./components/ServerNav/index.js";
import { closeModal } from "./store/modal.js";

function App() {
  const modal = useSelector(state => state.modals);

  return (
    <>
      {modal.modal === "add-server" && 
                <Modal />
            }
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
            <ServerNav />
            <Route path="/channels">
              <Channel />
            </Route>
            <Route path="/servers/:serverId/channels/:channelId">
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
