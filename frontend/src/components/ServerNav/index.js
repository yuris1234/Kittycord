import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { getServers } from "../../store/server"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUser, getUser } from "../../store/user"
import { closeModal } from "../../store/modal"

export default function ServerNav() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(getUser(currentUser.id))
    const servers = useSelector(getServers(user?.serverIds))

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser.id))
        }
    }, [currentUser])

    const handleClose = (e) => {
        dispatch(closeModal());
    }

    return (
        <div className="server-container"> 
              <NavLink onClick={handleClose} className="server-icon-wrapper" to="/channels" activeClassName="active-link">
                  <div className="server-tab">
                      <span className="server-tab-icon"></span>
                  </div>
                  <img className="server-icon" src="https://capycord.onrender.com/static/media/icon.544887f99d55e652be72.png"/>
              </NavLink>
              <div className="server-divider"></div>
              {servers?.map((server) => {
                return (
                <NavLink onClick={handleClose} className="server-icon-wrapper" to={`/servers/${server.id}/channels/${server.channels[0]}`} activeClassName="active-link">
                    <div className="server-tab">
                        <span className="server-tab-icon"></span>
                    </div>
                    <img className="server-icon" src="https://capycord.onrender.com/static/media/icon.544887f99d55e652be72.png"/>
                </NavLink>
                )
              })}
          </div>
    )
}