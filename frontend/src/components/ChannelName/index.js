import { useDispatch, useSelector } from "react-redux"
import Hashtag from "../../assets/hashtag"
import ChannelShow from "../ChannelShow"
import { useEffect } from "react";
import { fetchChannel } from "../../store/channel";
import { getChannel } from "../../store/channel";

export default function ChannelName({channelId}) {
    const dispatch = useDispatch();
    const channel = useSelector(getChannel(channelId));

    useEffect(() => {
        dispatch(fetchChannel(channelId));
    }, [channelId, dispatch])

    return (
        <div className="content-container">
            <div className="nav-container">
                <ul className="navbar">
                    <div className="friend-icon-div">
                        <Hashtag/>
                        <h1 className="channel-name">{channel?.name}</h1>
                    </div>
                </ul>
            </div>
            {channel && <ChannelShow channel={channel}/>}
        </div>
    )
}