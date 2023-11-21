import { useEffect } from "react"
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user";
import { logout } from "../../store/session";
import DmsIndex from "../DmsIndex";
import NavBar from "../NavBar";

export default function Channels() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    // const channelUser = useSelector(state => state.user[currentUser.id])

    // const friends = useSelector(state => Object.values(state.friends).select((friend) => {
    //     channelUser.friends.includes(friend.id)
    // }))
    // debugger
    
    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser.id))
        }
    }, [currentUser])

    if (!currentUser) {
        return <Redirect to="/login"/>
    }

    const handleLogout = (e) => {
        dispatch(logout());
    }

    return (
        <>
            <div className="channel-container">
                <NavBar />
                <DmsIndex/>
                <div className="profile">
                    <img src={`${currentUser.pfp_url}`} />
                    <p>{currentUser.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    )
}