// import EditMessage from "./EditMessage";
import EditMessage from "../EditMessage/EditMessage";
import { closeModal } from "../../store/modal";
import { useSelector } from "react-redux";

function Modal() {
    const modalSlice = useSelector(state => state.modals)

    if (!modalSlice) {
        return <h1>hello from modal</h1>;
    }

    let component;

    switch (modalSlice.modal) {
        case 'edit':
            component = <EditMessage  messageId={modalSlice.messageId}/>
            break;
        default:
            return null;
    }

    return (
        <>
            <h1>hello from modal</h1>
            <div className="modal-background" onClick={closeModal}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        </>
    ) 
}

export default Modal;