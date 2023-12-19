import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../store/message";
import { openModal } from "../../store/modal";
import EditMessage from "../EditMessage/EditMessage";
import { useSelector } from "react-redux";
import { updateMessage } from "../../store/message";
import { useHover } from "@uidotdev/usehooks";


const Message = ({ message }) => {
    const dispatch = useDispatch();
    // const [hovered, setHovered] = useState(false);
    const modal = useSelector(state => state.modals);
    const author = useSelector(state => state.users[message.authorId])
    const [body, setBody] = useState(message.body)
    const currentUser = useSelector(state => state.session.user)
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (author.id === currentUser.id) {
            setEditable(true);
        }
    }, [currentUser, author])

    const handleDelete = (e) => {
        dispatch(deleteMessage(message.id))
    }

    const handleModal = (e) => {
        dispatch(openModal('edit', message.id));
    }

    const handleSubmit = e => {
        dispatch(updateMessage({...message, body: body}))
        dispatch(openModal('view'));
    }

    const handleEscape = e => {
        dispatch(openModal('view'));
    }

    // const formatter = new Intl.DateTimeFormat("en-GB", {
    //     year: "numeric",
    //     month: "long",
    //     day: "2-digit"
    // });

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
            <div className="message-pfp new" >
                <img className="pfp" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                <div className="message new">
                    <ul className="message-show timed">
                        <ul className="message-profile">
                            <div className="message-details">
                                <li className="message-username">{author?.username}</li>
                                <li className="date-message">{formatter(message.createdAt)}</li>
                            </div>
                        </ul>
                        <div>
                            {modal.modal==='edit' && modal.id===message.id ? <textarea onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
                                if (e.code === 'Enter' && !e.shiftKey) {
                                    handleSubmit(e);
                                } else if (e.code === 'Escape' && !e.shiftKey) {
                                    handleEscape(e);
                                }}}></textarea> : 
                                <p className="message-body">{message.body}</p>
                            }
                        </div>
                    </ul>
                </div>
                            {editable && (
                            <div className="edit-button hide">
                                <button onClick={handleModal}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </div>
                            )}
            </div>
        </>
    )
}

export default Message;