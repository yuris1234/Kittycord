import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../../store/user"
import { getUser } from "../../store/user"
import MessageIcon from "../../assets/messageIcon"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { openModal } from "../../store/modal"
import { createDm } from "../../store/dm"
import { deleteFriendRequest, getOutgoingRequests } from "../../store/friendRequest"
import { getIncomingRequests } from "../../store/friendRequest"
import Cancel from "../../assets/cancel"
import Accept from "../../assets/accept"
import { createFriend } from "../../store/user"

export default function FriendsPending() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(getUser(currentUser?.id))
    const sentFriendRequests = useSelector(getOutgoingRequests(user?.sentFriendRequests)) 
    const receivedFriendRequests = useSelector(getIncomingRequests(user?.receivedFriendRequests))

    const handleAccept = (requestId, friendId) => async (e) => {
        await dispatch(deleteFriendRequest(requestId));
        await dispatch(createFriend(user.id, friendId));
    }

    const handleCancel = (requestId) => async (e) => {
        await dispatch(deleteFriendRequest(requestId));
    }

    return (
        <div className="friends-container">
            <ul className="friends-list">
                <p className="friend-status" >PENDING - {sentFriendRequests?.length + receivedFriendRequests?.length}</p>
                {sentFriendRequests?.map((friended) => {
                    return (
                    <div className="friend-item">
                        <ul className="message-profile friends">
                            <img className="pfp friends" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                            <div className="friend-details">
                                <li className="message-username">{Object.values(friended)[0]?.username}</li>
                                <p className="friend-status">Outgoing Friend Request</p>
                            </div>
                        </ul>
                        <div onClick={handleCancel(Object.keys(friended)[0])} className="action-button cancel"><Cancel/></div>
                    </div>
                    )
                })}
                {receivedFriendRequests?.map((friender) => {
                    return (
                    <div className="friend-item">
                        <ul className="message-profile friends">
                            <img className="pfp friends" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                            <div className="friend-details">
                                <li className="message-username">{Object.values(friender)[0]?.username}</li>
                                <p className="friend-status">Incoming Friend Request</p>
                            </div>
                        </ul>
                        <div className="action-buttons">
                            <div onClick={handleAccept(Object.keys(friender)[0], Object.values(friender)[0].id)} className="action-button accept"><Accept/></div>
                            <div onClick={handleCancel(Object.keys(friender)[0])} className="action-button cancel"><Cancel/></div>
                        </div>
                    </div>
                    )
                })}
            </ul>
        </div>
    )



}