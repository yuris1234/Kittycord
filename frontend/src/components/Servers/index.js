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

export default function Server() {
    const {channelId, serverId} = useParams()
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const server = useSelector(getServer(serverId))
    const channels = useSelector(getChannels(server?.channels))

    useEffect(() => {
        dispatch(fetchServer(serverId));
    }, [serverId, dispatch, currentUser])

    const handleLogout = (e) => {
        dispatch(logout())
    }
    return (
        <>
            <div className="dms-wrapper">
                <div>
                    <div className="search-bar server">
                        <h1>{server?.name}</h1>
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
                    <img className="pfp" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                    <p>{currentUser.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <ChannelName channelId={channelId}/>
        </>
    )
}