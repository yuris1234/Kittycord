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
    const [hovered, setHovered] = useState(false);
    // const [ref, hovering] = useHover();
    const modal = useSelector(state => state.modals);
    const author = useSelector(state => state.users[message.authorId])
    const [body, setBody] = useState(message.body)
    const currentUser = useSelector(state => state.session.user)

    // const [scrolledY, setScrolledY] = useState(0);

    // const handleScroll = () => {
    //     const scrollY = window.scrollY;
    //     setScrolledY(scrollY);
    //     console.log(scrolledY)
    // };
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //     window.removeEventListener("scroll", handleScroll);
    //     };
    //   }, [scrolledY]);

    const handleHover = (e) => {
        setHovered(true)
    }

    const handleNoHover = (e) => {
        setHovered(false)
    }

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

    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
    


    return (
        <>
            <div className="message-pfp" onMouseEnter={handleHover} onMouseLeave={handleNoHover}>
                <img className="pfp" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                <div className="message">
                    <ul className="message-show">
                        <ul className="message-profile">
                            <div className="message-details">
                                <li>{author?.username}</li>
                                <li className="date-message">{formatter.format(new Date(message.createdAt))}</li>
                            </div>
                            {hovered && (
                            <div className="edit-button">
                                <button onClick={handleModal}>Edit</button>
                                <button onClick={handleDelete}>Delete</button>
                            </div>
                            )}
                        </ul>
                        <div>
                            {modal.modal==='edit' && modal.id===message.id ? <textarea onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
                                    if (e.code === 'Enter' && !e.shiftKey) {
                                        handleSubmit(e);
                                    } else if (e.code === 'Escape' && !e.shiftKey) {
                                        handleEscape(e);
                                    }}}></textarea> : 
                                    <p>{message.body}</p>
                                }
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Message;