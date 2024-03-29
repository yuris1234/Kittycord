import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteMessage } from "../../store/message";
import { openModal } from "../../store/modal";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { updateMessage } from "../../store/message";    
import Edit from "../../assets/edit";
import Delete from "../../assets/delete";

export default function UntimedMessage({first, message}) {
    const dispatch = useDispatch();
    // const [hovered, setHovered] = useState(false);
    const modal = useSelector(state => state.modals);
    const author = useSelector(state => state.users[message.authorId])
    const [body, setBody] = useState(message.body)
    const currentUser = useSelector(state => state.session.user)
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (author?.id === currentUser?.id) {
            setEditable(true);
        }
        document.addEventListener("keydown", handleEscape, false);
    }, [currentUser, author])

    const handleDelete = (e) => {
        dispatch(deleteMessage(message.id))
    }

    const handleModal = (e) => {
        dispatch(openModal('edit', message.id));
    }

    const handleSubmit = e => {
        if (body === "") {
            setBody(message.body)
            dispatch(openModal('view'))
        } else {
            dispatch(updateMessage({...message, body: body}))
            dispatch(openModal('view'));
        }
    }

    const handleEscape = e => {
        if (e.code === 'Escape') {
            dispatch(openModal('view'));
        }
    }

    function formatter(createdAt) {
        const date = new Date(createdAt);
        let hours = date.getHours();
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
      }

    return (
        <>
            <div className="message-pfp">
                <div className="message">
                    <ul className="message-show untimed">
                        <li className="date-message hide">{formatter(message.createdAt)}</li>
                        {modal.modal==='edit' && modal.id===message.id ? <div className="edit-message-operations">
                                    <textarea className="edit-textbox" onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
                                    if (e.code === 'Enter' && !e.shiftKey) {
                                        handleSubmit(e);
                                    } else if (e.code === 'Escape' && !e.shiftKey) {
                                        handleEscape(e);
                                    }}}></textarea> 
                                    <div>escape to cancel, enter to save</div>
                                </div> : 
                                <p className="message-body">{message.body}</p>
                            }
                    </ul>
                </div>
                {editable && (
                    <ul className="message-profile absolute">
                        <div className="edit-button hide">
                        <div className="message-buttons edit-message-icon" onClick={handleModal}><Edit/></div>
                        <div className="message-buttons delete-message-icon" onClick={handleDelete}><Delete/></div>
                        </div>
                    </ul>
                )}
            </div>
        </>
    )

}