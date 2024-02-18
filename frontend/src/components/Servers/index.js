import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../../store/session"
import Hashtag from "../../assets/hashtag";
import { useEffect } from "react";
import { fetchServer } from "../../store/server";
import { getServer } from "../../store/server";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchChannel } from "../../store/channel";
// import ChannelName from "../ChannelName";
import ChannelName from "../ChannelName";
import { getChannels } from "../../store/channel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { closeModal } from "../../store/modal";

export default function Server() {
    const {channelId, serverId} = useParams()
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const server = useSelector(getServer(serverId))
    const channels = useSelector(getChannels(server?.channels))
    
    useEffect(() => {
        dispatch(fetchServer(serverId));
    }, [serverId, dispatch, currentUser])
    
    if (!currentUser) {
        return <Redirect to="/login"/>
    }
    const handleLogout = (e) => {
        dispatch(logout());
        dispatch(closeModal());
    }
    return (
        <>
            <div className="dms-wrapper">
                <div>
                    <div className="search-bar server">
                        <h1>{server?.name === "server" ? `${currentUser.username}'s Server` : server?.name}</h1>
                    </div>
                    <ul className="dms-list server">
                        {channels?.map((channel) => {
                            return (
                                <NavLink to={`/servers/${server.id}/channels/${channel.id}`} className="channel-item" activeClassName="active-channel">
                                    <Hashtag/>
                                    <div className="channel-link">{channel.name}</div>
                                </NavLink>
                                )
                        })}
                    </ul>
                </div>
                <div className="profile">
                <img className="pfp" src={currentUser.pfpUrl} />
                        <p className="username">{currentUser.username}</p>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <ChannelName channelId={channelId}/>
        </>
    )
}