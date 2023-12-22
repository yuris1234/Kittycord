import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import consumer from '../../consumer';
import { createMessage, removeMessage } from "../../store/message";
import { fetchDm } from "../../store/dm";
import { receiveMessage } from "../../store/message";
import { getChannelMessages } from "../../store/message";
import Message from "../Message/Message";
import { getDm } from "../../store/dm";
import { getUsers, receiveUser } from "../../store/user";
import UntimedMessage from "../UntimedMessage/UntimedMessage";
import { useRef } from "react";

export default function ChannelShow({channel}) {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const currentUser = useSelector(state => state.session.user);
    const messages = useSelector(getChannelMessages(channel?.id));
    const ref = useRef(null);

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
          { channel: 'DmsChannel', id: channel?.id },
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
      }, [channel?.id, dispatch]);  

    const handleSubmit = (e) => {
        dispatch(createMessage({body: body, author_id: currentUser.id, messageable_type: 'Channel', messageable_id: channel?.id}));
        setBody('');
        e.target.placeholder = `Message @${channel.name}`
    }

    const scrollBottom = (e) => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }

    useEffect(() => {
        scrollBottom();
    })

    let author = null;

    return (
        <>
        <div className="dms-container">
            <div className="dm-show">
                <ul className="dm-container" ref={ref}>
                    {messages.map((message, i) => {
                        if (author !== message.authorId) {
                            author = message.authorId
                            return <Message key={message.id} message={message}/>
                        } else {
                            return <UntimedMessage key={message.id} message={message}/>
                        }
                    })}
                </ul>
                <form className="send-container">
                    <textarea placeholder={`Message @${channel.name}`} className="send-message" onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
                        if (e.code === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}> 
                    </textarea>
                </form>
            </div>

        </div>
        </>

    )
}