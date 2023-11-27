import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../store/message";
import { openModal } from "../store/modal";
import EditMessage from "./EditMessage";
import { useSelector } from "react-redux";


const Message = ({ message }) => {
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const modal = useSelector(state => state.modals);
    const author = useSelector(state => state.users[message.authorId])
    const currentUser = useSelector(state => state.session.user)

    const handleHover = (e) => {
        setShowEdit(true)
    }

    const handleNoHover = (e) => {
        setShowEdit(false)
    }

    const handleDelete = (e) => {
        dispatch(deleteMessage(message.id))
    }

    const handleModal = (e) => {
        dispatch(openModal('edit', message.id));
    }

    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });


    return (
        <>
            <div className="message-pfp">
                <img className="pfp" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                <div className="message" onMouseEnter={handleHover} onMouseLeave={handleNoHover}>
                    {showEdit && (
                        <ul className="message-show">
                            <ul className="message-profile">
                                <div className="message-details">
                                    <li>{author?.username}</li>
                                    <li className="date">{formatter.format(new Date(message.createdAt))}</li>
                                </div>
                                <div className="edit-button">
                                    <button onClick={handleModal}>Edit</button>
                                    <button onClick={handleDelete}>Delete</button>
                                </div>
                            </ul>
                            <p>{message.body}</p>
                            <div>
                                {modal.modal==='edit' && modal.id===message.id && (
                                    <EditMessage message={message} />
                                )}
                            </div>
                        </ul>
                    )}
                    {!showEdit && (
                        <>
                            <ul className="message-show">
                                <ul className="message-profile">
                                    <div className="message-details">
                                        <li>{author?.username}</li>
                                        <li className="date">{formatter.format(new Date(message.createdAt))}</li>
                                    </div>
                                </ul>
                                <p>{message.body}</p>
                            </ul>
                        </>
                        
                    )}
                </div>
            </div>
        </>
    )
}

export default Message;