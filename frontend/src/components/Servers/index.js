import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../../store/session"
import Hashtag from "../../assets/hashtag";

export default function Server() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const handleLogout = (e) => {
        dispatch(logout())
    }
    return (
        <>
            <div className="dms-wrapper">
                <div className="search-bar server">
                    <h1>Server Name</h1>
                </div>
                <div>
                    <ul className="dms-list">
                             
                    </ul>
                </div>
                <div className="profile">
                    <img className="pfp" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                    <p>{currentUser.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
                <div className="content-container">
                <div className="nav-container">
                    <ul className="navbar">
                        <div className="friend-icon-div">
                            <Hashtag/>
                            <h1 className="channel-name">general</h1>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}