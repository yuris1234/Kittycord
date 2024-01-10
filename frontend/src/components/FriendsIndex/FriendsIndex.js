import { useSelector } from "react-redux";
import { getFriends } from "../../store/user";
import FriendsOnline from "../FriendsOnline";
import { useState } from "react";
import FriendsAll from "../FriendsAll";
import FriendsPending from "../FriendsPending";
import AddFriend from "../AddFriend";

function FriendsIndex({setCurrentDm, view}) {

    return (
        <>
         {view === 'online' && <FriendsOnline setCurrentDm={setCurrentDm}/>}
         {view === 'all' && <FriendsAll setCurrentDm={setCurrentDm}/>}
         {view === 'pending' && <FriendsPending />}
         {view === 'add-friend' && <AddFriend />}
        </>
    )

}

export default FriendsIndex;