// import EditMessage from "./EditMessage";
import EditMessage from "../EditMessage/EditMessage";
import { closeModal } from "../../store/modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createServer } from "../../store/server";

function Modal() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const [ serverName, setServerName ]  = useState('')
    // const modalSlice = useSelector(state => state.modals)

    // if (!modalSlice) {
    //     return <h1>hello from modal</h1>;
    // }

    // let component;

    // switch (modalSlice.modal) {
    //     case 'edit':
    //         component = <EditMessage  messageId={modalSlice.messageId}/>
    //         break;
    //     default:
    //         return null;
    // }

    const handleClose = (e) => {
        dispatch(closeModal());
    }

    const handleChange = (e) => {
        setServerName(e.target.value)
    }

    const handleSubmit = (e) => {
        dispatch(createServer(currentUser.id, {owner_id: currentUser.id, name: serverName}))
    }

    return (
        <>
            <div className="modal-background" onClick={handleClose}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    <div className="modal-popup">
                        <h1 className="modal-header">Create Your Server</h1>
                        <p className="modal-text">Give your new server a personality with a name.</p>
                        <div className="friends-container modal">
                            <ul className="friends-list add-friend-list server-name">
                                <h1 className="add-friend-header">SERVER NAME</h1>
                                <div className="search-bar add-friend-search-bar server-name-input">
                                    <input value={serverName} onChange={handleChange} type="text" placeholder={`${currentUser.username}'s server`} className="search-button add-friend-search-button" />
                                </div>
                                <div onClick={handleSubmit} className="search-button send-friend-request filled server-submit">Create</div>
                            </ul>
                        </div>
                    </div>
                    {/* <div className="form-container">
                        <div className="form-wrapper">
                            <div className="login-welcome">
                                <h1 className="header">Create Your Server</h1>
                                <div className="subheader">Your server is where you and your friends hang out. Make yours and start talking.</div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    ) 
}

export default Modal;