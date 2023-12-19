import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modal";

function NavBar({setView}) {
    const dispatch = useDispatch();

    const handleOnline = (e) => {
        setView('online')
        dispatch(closeModal());
    }

    const handleAll = (e) => {
        setView('all')
        dispatch(closeModal());
    }

    const handlePending = (e) => {
        setView('pending')
        dispatch(closeModal());
    }
    
    return (
        <div className="nav-container">
            <ul className="navbar">
                <li>Friends</li>
                <li className="nav-button" onClick={handleOnline}>Online</li>
                <li className="nav-button" onClick={handleAll}>All</li>
                <li className="nav-button" onClick={handlePending}>Pending</li>
                <li>Add Friend</li>
            </ul>
        </div>
    )
}

export default NavBar