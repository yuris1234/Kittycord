import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import consumer from '../../consumer';
import { createMessage } from "../../store/message";
import { fetchDm } from "../../store/dm";
import { receiveMessage } from "../../store/message";
import { getMessages } from "../../store/message";
import Message from "../Message/Message";
import { getDm } from "../../store/dm";
import { getUsers } from "../../store/user";

export default function Dm({dmId}) {
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    let dm = useSelector(getDm(dmId));
    const currentUser = useSelector(state => state.session.user);
    const messages = useSelector(getMessages(dmId));
    const members = useSelector(getUsers(dm?.members))

    const filteredMember = members.filter((member) => {
        console.log(members)
        return member.id !== currentUser.id
    })[0]

    useEffect(() => {
        dispatch(fetchDm(dmId))
    }, [dmId])

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
        e.target.placeholder = `Message @${filteredMember.username}`
    }

    return (
        <>
            <ul className="dm-container">
                    <li>{messages.map((message) => {
                        return <Message key={message.id} message={message}/>
                    })}</li>
                    <form className="send-container">
                    <textarea placeholder={`Message @${filteredMember?.username}`} className="send-message" onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
                        if (e.code === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}> 
                    </textarea>
                    </form>
            </ul>
        </>

    )
}