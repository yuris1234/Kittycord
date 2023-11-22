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

    // console.log(author);


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
                <img className="pfp" src="./unknown.png" />
                <div className="message" onMouseEnter={handleHover} onMouseLeave={handleNoHover}>
                    {showEdit && (
                        <ul className="message-show">
                            <ul className="message-profile">
                                <li>{author?.username}</li>
                                <li>{formatter.format(new Date(message.createdAt))}</li>
                                <div className="edit-button">
                                    <button onClick={handleModal}>Edit</button>
                                    <button onClick={handleDelete}>Delete</button>
                                </div>
                            </ul>
                            <p>{message.body}</p>
                            <div>
                                {showEdit && modal.modal==='edit' && modal.id===message.id && (
                                    <EditMessage message={message} />
                                )}
                            </div>
                        </ul>
                    )}
                    {!showEdit && (
                        <>
                            <ul className="message-show">
                                <ul className="message-profile">
                                    <li>{author?.username}</li>
                                    <li>{formatter.format(new Date(message.createdAt))}</li>
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