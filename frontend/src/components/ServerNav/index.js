import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { getServers } from "../../store/server"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUser, getUser } from "../../store/user"
// import ReactReduxContex from "react-redux"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { closeModal } from "../../store/modal"
import DiscordIcon from "../../assets/discord_icon"
import Plus from "../../assets/plus"
import { openModal } from "../../store/modal"

export default function ServerNav() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(getUser(currentUser?.id))
    const servers = useSelector(getServers(user?.serverIds))
    

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser.id))
        }
    }, [currentUser])

    if (!currentUser) {
        return <Redirect to="/login"/>
    }

    // const handleClose = (e) => {
    //     dispatch(closeModal());
    // }

    const handleCreate = (e) => {
        dispatch(openModal("add-server"))
    }

    return (
        <div className="server-container"> 
              <NavLink onClick={handleClose} className="server-icon-wrapper" to="/channels" activeClassName="active-link">
                  <div className="server-tab">
                      <span className="server-tab-icon"></span>
                  </div>
                  <DiscordIcon/>
              </NavLink>
              <div className="server-divider"></div>
              {servers?.map((server) => {
                return (
                <NavLink onClick={handleClose} className="server-icon-wrapper" to={`/servers/${server.id}/channels/${server.channels[0]}`} activeClassName="active-link">
                    <div className="server-tab">
                        <span className="server-tab-icon"></span>
                    </div>
                    <div className="server-name-icon">{server.name[0]}</div>
                </NavLink>
                )
              })}
              <div className="server-icon-wrapper create-server">
                <div className="server-tab">
                    <span className="server-tab-icon"></span>
                </div>
                <Plus />
              </div>
          </div>
    )
}