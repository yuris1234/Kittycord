import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import consumer from '../../consumer';
import { createMessage, removeMessage } from "../../store/message";
import { fetchDm } from "../../store/dm";
import { receiveMessage } from "../../store/message";
import { getDmMessages } from "../../store/message";
import Message from "../Message/Message";
import { getDm } from "../../store/dm";
import { getUsers, receiveUser } from "../../store/user";
import UntimedMessage from "../UntimedMessage/UntimedMessage";
import { useRef } from "react";
import FirstMessage from "../FirstMessage";

export default function Dm({dmId}) {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    let dm = useSelector(getDm(dmId));
    const currentUser = useSelector(state => state.session.user);
    const messages = useSelector(getDmMessages(dmId));
    const members = useSelector(getUsers(dm?.members));
    const ref = useRef(null);

    const filteredMember = members.filter((member) => {
        return member.id !== currentUser.id
    })[0]

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
          { channel: 'DmsChannel', id: dmId },
          {
            received: ({type, message, id})  => {
                switch (type) {
                    case 'DESTROY_MESSAGE':
                        dispatch(removeMessage(id));
                        break
                    default:
                        console.log('Received message ', message)
                        dispatch(receiveMessage({message: message}))
                        break
                }
            }
          }
        );
    
        return () => subscription?.unsubscribe();
      }, [dmId, dispatch]);  

    const handleSubmit = (e) => {
        dispatch(createMessage({body: body, author_id: currentUser.id, messageable_type: 'Dm', messageable_id: dmId}));
        setBody('');
        e.target.placeholder = `Message @${filteredMember.username}`
    }

    const scrollBottom = (e) => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }

    useEffect(() => {
        scrollBottom();
    })

    function timeDif(messageDate, recentDate) {
        let recent = new Date(recentDate);
        let message = new Date(messageDate);
        let dif = message - recent;
        let hour = 60 * 60 * 1000;
        if (Math.abs(message - recent) > hour) {
            return true;
        }
        return false;
    }

    function messageDivider(messageDate, recentDate) {
        let currentDate = new Date(messageDate);
        let nextDay = new Date(recentDate);
        nextDay.setDate(nextDay.getDate() + 1);

        return nextDay.getFullYear() === currentDate.getFullYear() &&
            nextDay.getMonth() === currentDate.getMonth() &&
            nextDay.getDate() === currentDate.getDate();
    }

    let author = null;

    return (
        <>

                <ul className="dm-container" ref={ref}>
                    <div className="first"></div>
                    {messages.map((message, i) => {
                            let recent = messages[i - 1]
                            if (author !== message.authorId || timeDif(message.createdAt, recent.createdAt)) {
                                author = message.authorId
                                if (i === 0) {
                                    return <FirstMessage key={message.id} message={message}/>
                                } else {
                                    return <Message first={i} key={message.id} message={message} divider={messageDivider(message.createdAt, recent.createdAt)}/>
                                }
                            } else {
                                return <UntimedMessage first={i} key={message.id} message={message}/>
                            }
                    })}
                </ul>
                    <form className="send-container">
                    <textarea placeholder={`Message @${filteredMember?.username}`} className="send-message" onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
                        if (e.code === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}> 
                    </textarea>
                    </form>
        </>

    )
}