import { useDispatch } from "react-redux";
import { closeModal } from "../store/modal";

function NavBar() {
    const dispatch = useDispatch();

    const handleModal = (e) => {
        dispatch(closeModal());
    }
    
    return (
        <ul className="navbar">
            <li>Friends</li>
            <li className="nav-button" onClick={handleModal}>Online</li>
            <li>All</li>
            <li>Pending</li>
            <li>Blocked</li>
            <li>Add Friend</li>
        </ul>
    )
}

export default NavBar