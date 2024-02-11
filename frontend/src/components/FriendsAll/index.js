import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../../store/user"
import { getUser } from "../../store/user"
import MessageIcon from "../../assets/messageIcon"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { openModal } from "../../store/modal"
import { createDm } from "../../store/dm"

export default function FriendsAll({setCurrentDm}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(getUser(currentUser?.id))
    const friends = useSelector(getFriends(user?.friendIds)) 
    const dms = useSelector(state => state.dms)

    const handleClick = (friendId) => async (e) => {
        let exists = true;
        console.log(dms);
        Object.values(dms).forEach((dm) => {
            console.log('hi');
            if (dm.members.includes(friendId)) {
                dispatch(openModal('view'));
                setCurrentDm(dm.id)
                exists = false;
                return;
            }
        })
        console.log(exists);
        if (exists === true) {
            const newDm = await dispatch(createDm(user.id, friendId));
            await dispatch(openModal('view'))
            setCurrentDm(newDm.dm.id)
        }
    }

    return (
        <div className="friends-container">
            <ul className="friends-list">
                <p className="friend-status" >ALL - {friends?.length}</p>
                {friends?.map((friend) => {
                    return (
                    <div onClick={handleClick(friend.id)}className="friend-item">
                        <ul className="message-profile friends">
                            <img className="pfp friends" src={friend.pfpUrl} />
                            <div className="friend-details">
                                <li className="message-username">{friend?.username}</li>
                                <p className="friend-status">{friend?.status.charAt(0).toUpperCase() + friend?.status.slice(1)}</p>
                            </div>
                        </ul>
                        <div className="action-button"><MessageIcon/></div>
                    </div>
                    )
                })}
            </ul>
        </div>
    )



}