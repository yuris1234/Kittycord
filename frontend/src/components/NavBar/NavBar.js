import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modal";
import Friend from "../../assets/friend";

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
                <div className="friend-icon-div">
                    <Friend/>
                    <li>Friends</li>
                    <div className="nav-divider"></div>
                    <li className="nav-button online" onClick={handleOnline}>Online</li>
                </div>
                <li className="nav-button" onClick={handleAll}>All</li>
                <li className="nav-button" onClick={handlePending}>Pending</li>
                <li className="nav-button">Blocked</li>
                <li className="nav-button add-friend">Add Friend</li>
            </ul>
        </div>
    )
}

export default NavBar