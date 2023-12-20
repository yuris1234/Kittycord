import Dm from "../Dm/Dm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal";
import { useState } from "react";
import { fetchUser } from "../../store/user";
import DmsIndexItem from "../DmsIndexItem/DmsIndexItem";
import FriendsIndex from "../FriendsIndex/FriendsIndex";


export default function DmsIndex({view, currentDm, setCurrentDm}) {
    const modal = useSelector(state => state.modals);

    return (
        <>
            <div className="dms-container">
                {modal.modal && (
                    <div className="dm-show">
                        <Dm dmId={currentDm}/>
                    </div>
                )}
                {!modal.modal && (
                    <div className="friends-wrapper">
                        <FriendsIndex view={view} setCurrentDm={setCurrentDm}/>
                    </div>
                )}
            </div>
        </>
    )
}