import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import consumer from '../consumer';
import { createMessage } from "../store/message";
import { fetchDm } from "../store/dm";
import { receiveMessage } from "../store/message";
import { getMessages } from "../store/message";
import Message from "./Message";

export default function Dm({dmId}) {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [userInDm, setUserInDms] = useState({});
    let dm = useSelector(state => state.dms[dmId]);
    const currentUser = useSelector(state => state.session.user);
    const messages = useSelector(getMessages(dmId));
    // const messages = useSelector(state => state.messages)

    useEffect(() => {
        dispatch(fetchDm(dmId))
    }, [dmId])

    useEffect(() => {
        dm.members.forEach((member) => {
            if (member !== currentUser.username) {
                setUserInDms(member);
            }
        })
    }, [])

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
          { channel: 'DmsChannel', id: dmId },
          {
            received: message  => {
                dispatch(receiveMessage(message))
                console.log('Received message ', message)
            }
          }
        );
    
        return () => subscription?.unsubscribe();
      }, [dmId, dispatch]);  

    const handleSubmit = (e) => {
        dispatch(createMessage({body: body, author_id: currentUser.id, messageable_type: 'Dm', messageable_id: dmId}));
        setBody('');
        e.target.placeholder = `Message @${userInDm}`
    }

    return (
        <>
            <ul>
                {messages.map((message) => {
                    return <Message message={message}/>
                })}
            </ul>
            <form >
                <textarea placeholder={`Message @${userInDm}`} className="send-message" onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
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