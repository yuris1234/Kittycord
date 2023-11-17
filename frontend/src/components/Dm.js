import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import consumer from '../consumer';
import { createMessage } from "../store/message";
import { fetchDm } from "../store/dm";

export default function Dm() {
    const { dmId } = useParams();
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [usersInDm, setUsersInDms] = useState({});
    const dm = useSelector(state => state.dms[dmId]);
    const currentUser = useSelector(state => state.session.user);
    // const messages = useSelector(state => 
    //     Object.values(state.messages).select((message) => {
    //         debugger
    //         dm.messages.includes(message.id)
    //     })
    //     )

    useEffect(() => {
        dispatch(fetchDm(dmId))
        // debugger
    })

    useEffect(() => {
        const subscription = consumer.subscriptions.create(
          { channel: 'DmsChannel', id: dmId },
          {
            received: message => {
                console.log('Received message ', message)
            }
          }
        );
    
        return () => subscription?.unsubscribe();
      }, [dmId, dispatch]);  


    const handleSubmit = (e) => {
        dispatch(createMessage({body: body, author_id: currentUser.id, messageable_type: 'Dm', messageable_id: dmId}));
        setBody('');
    }

    return (
        <>
            <h1>Hello from Dm </h1>
            <form>
                <textarea onChange={e => setBody(e.target.value)} value={body} onKeyDown={e => {
                    if (e.code === 'Enter' && !e.shiftKey) {
                        handleSubmit(e);
                    }
                }}> 
                </textarea>
            </form>
        </>

    )
}