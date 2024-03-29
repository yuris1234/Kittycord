import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../store/message";
import { openModal } from "../../store/modal";
import EditMessage from "../EditMessage/EditMessage";
import { useSelector } from "react-redux";
import { updateMessage } from "../../store/message";
import { useHover } from "@uidotdev/usehooks";
import { useRef } from "react";
import Edit from "../../assets/edit";
import Delete from "../../assets/delete";

export default function NewMessage({message}) {
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

    // const formatter = new Intl.DateTimeFormat("en-GB", {
    //     year: "numeric",
    //     month: "long",
    //     day: "2-digit"
    // });

    function formatter(createdAt) {
        const date = new Date(createdAt);
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hours = date.getHours();
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate + " " + formattedTime;
      }


    return (
        <>
            <div className="message-pfp new first" >
                <img className="pfp" src={author?.pfpUrl} />
                <div className="message new">
                    <ul className="message-show timed">
                        <ul className="message-profile">
                            <div className="message-details">
                                <li className="message-username">{author?.username}</li>
                                <li className="date-message">{formatter(message.createdAt)}</li>
                            </div>
                        </ul>
                        <div className="message-length">
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
                        </div>
                    </ul>
                </div>
                    {editable && (
                    <div className="edit-button new hide">
                        <div className="message-buttons edit-message-icon" onClick={handleModal}><Edit/></div>
                        <div className="message-buttons delete-message-icon" onClick={handleDelete}><Delete/></div>
                    </div>
                    )}
            </div>
        </>
    )
}