import { useEffect } from "react"
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user";
import { logout } from "../../store/session";
import DmsIndex from "../DmsIndex";

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
            {/* {user.servers.map((serverId) => {
                return <Link to={`/servers/{serverId}`}></Link>
            })} */}
            <h1>Hello from Channels</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* <DmsIndex /> */}
        </>
    )
}