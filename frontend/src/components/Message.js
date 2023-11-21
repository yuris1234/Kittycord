import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../store/message";
import { openModal } from "../store/modal";
import EditMessage from "./EditMessage";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const modal = useSelector(state => state.modals)

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
        dispatch(openModal('edit'));
    }

    return (
        <>
            <div onMouseEnter={handleHover} onMouseLeave={handleNoHover}>
                {showEdit && modal==='edit' && (
                    <EditMessage message={message} />
                )}
                {showEdit && (
                    <ul>
                        <li>{message.body}</li>
                        <li>{message.createdAt}</li>
                        <button onClick={handleModal}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </ul>
                )}
                {!showEdit && (
                    <li> {message.body} </li>
                )}
            </div>
        </>
    )
}

export default Message;