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
            <li className="dm" onClick={handleModal}>{filteredMembers?.username}</li>
        </>
    )
}