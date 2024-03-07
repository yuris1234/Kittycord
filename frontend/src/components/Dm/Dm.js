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

    function timeDif(date) {
        let currentDate = new Date();
        let pastDate = new Date(date);
        let dif = Math.abs(currentDate - pastDate)
        let hour = 60 * 60 * 1000;
        if (dif > hour) {
            return true;
        }
        return false;
    }

    let author = null;

    return (
        <>

                <ul className="dm-container" ref={ref}>
                    <div className="first"></div>
                    {messages.map((message, i) => {
                            if (author !== message.authorId || timeDif(message.createdAt)) {
                                author = message.authorId
                                if (i === 0) {
                                    return <FirstMessage key={message.id} message={message}/>
                                } else {
                                    return <Message first={i} key={message.id} message={message}/>
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