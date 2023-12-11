import { useEffect } from "react"
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user";
import { logout } from "../../store/session";
import DmsIndex from "../DmsIndex/DmsIndex";
import NavBar from "../NavBar/NavBar";

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
                <DmsIndex user={currentUser}/>
                <div className="profile">
                    <img className="pfp" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                    <p>{currentUser.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    )
}