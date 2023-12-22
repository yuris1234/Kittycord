import { useEffect } from "react"
import { Link, NavLink, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user";
import { logout } from "../../store/session";
import DmsIndex from "../DmsIndex/DmsIndex";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import DmsIndexItem from "../DmsIndexItem/DmsIndexItem";

export default function Channels() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const [view, setView] = useState('online')
    const [currentDm, setCurrentDm] = useState(null);
    const dms = useSelector(state => state.dms)
    
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

    const handleNavigate = (e) => {

    }

    return (
        <>
                <div className="dms-wrapper">
                    <div>
                        <div className="search-bar">
                            <button type="button" className="search-button" >Find or start a conversation</button>
                        </div>
                        <div>
                            <h1 className="direct-messages">Direct Messages</h1>
                            <ul className="dms-list">
                                {Object.values(dms).map((dm) => {
                                    return <DmsIndexItem setCurrentDm={setCurrentDm} dmId={dm.id}/>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="profile">
                        <img className="pfp" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                        <p>{currentUser.username}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="content-container">
                    <NavBar setView={setView}/> 
                    <DmsIndex currentDm={currentDm} view={view} setView={setView} user={currentUser}/>
                </div>
            {/* </div> */}
        </>
    )
}