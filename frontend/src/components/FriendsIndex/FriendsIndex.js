import { useSelector } from "react-redux";
import { getFriends } from "../../store/user";
import FriendsOnline from "../FriendsOnline";
import { useState } from "react";

function FriendsIndex({setCurrentDm}) {
    const [view, setView] = useState('online')
    const modal = useSelector(state => state.modals)

    const changeView = (state) => (e) => {
        setView(state);
    }

    return (
        <>
         {view === 'online' && <FriendsOnline setCurrentDm={setCurrentDm}/>}
        </>
    )

}

export default FriendsIndex;