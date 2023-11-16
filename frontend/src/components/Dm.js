import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dm() {
    const { dmId } = useParams();
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [usersInDm, setUsersInDms] = useState({});
    const dm = useSelector(state => state.dms[dmId]);
    const currentUser = useSelector(state => state.session.user);


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

    return (
        <>
            <h1>{`Hello from Dm #${dmId}`}</h1>
        </>

    )
}