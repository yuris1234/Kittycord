import { useSelector, useState } from "react-redux";
import { openModal } from "../../store/modal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDm } from "../../store/dm";
import { getDm } from "../../store/dm";
import { getUsers } from "../../store/user";

export default function DmsIndexItem({dmId, setCurrentDm}) {
    const dispatch = useDispatch();
    const dm = useSelector(getDm(dmId));
    const currentUser = useSelector(state => state.session.user)
    const members = useSelector(getUsers(dm?.members))
    const modal = useSelector(state => state.modals);

    const handleModal = async (e) => {
        if (!modal.modal) {
            await dispatch(openModal('view'))
        }
        setCurrentDm(dmId)
    }
    
    const filteredMembers = members.filter((member) => {
        return member.id !== currentUser.id
    })[0]

    useEffect(() => {
        dispatch(fetchDm(dmId))
    }, [])

    return (
        <>
            <div onClick={handleModal} className="dm-index-item">
                <img className="dm-pfp" src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg" />
                <div className="username-status">
                    <li className="dm" >{filteredMembers?.username}</li>
                    <li className="status">{filteredMembers?.status==="online" ? "online" : ""}</li>
                </div>
            </div>
        </>
    )
}