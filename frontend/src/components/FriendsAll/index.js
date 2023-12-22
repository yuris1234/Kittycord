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
        Object.values(dms).forEach((dm) => {
            if (dm.members.includes(friendId)) {
                dispatch(openModal('view'));
                setCurrentDm(dm.id)
                exists = false;
                return;
            }
        })
        if (exists) {
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
                            <img className="pfp friends" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
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