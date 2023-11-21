import Dm from "./Dm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modal";
import { useState } from "react";
import { fetchUser } from "../store/user";
import FriendsIndex from "./FriendsIndex";


export default function DmsIndex() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(fetchUser(user.id))
    }, [])
    // const dms = useSelector(state => 
    //     Object.values(state.dms).filter((dm) => {
    //         dm.members.includes(user.username);
    //     }))
    const dms = useSelector(state => state.dms)
    const modal = useSelector(state => state.modals);
    const [currentDm, setCurrentDm] = useState(null);
    
    useEffect(() => {
        dispatch(fetchUser(user.id))
    }, [])

    const handleModal = (e) => {
        dispatch(openModal('view'))
        setCurrentDm(e.target.value);
    }

    return (
        <>
            <div className="dms-container">
                <div className="dms-wrapper">
                    <ul className="dms-list">
                        {Object.values(dms).map((dm) => {
                            return <li className="dm" value={dm.id} onClick={handleModal}>{dm.members.join(', ')}</li>
                        })}
                    </ul>
                    {modal && (
                        <div className="dm-show">
                            <Dm dmId={currentDm}/>
                        </div>
                    )}
                    {!modal && (
                        <div>
                            <FriendsIndex user={user}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}