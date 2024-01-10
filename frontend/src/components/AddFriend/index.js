import { useDispatch } from "react-redux";
import { getFriends } from "../../store/user";
// import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user";
import { useState } from "react";
import { createFriendRequest } from "../../store/friendRequest";

export default function AddFriend() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(getUser(currentUser?.id))
    const friends = useSelector(getFriends(user?.friendIds)) 
    const dms = useSelector(state => state.dms)
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(prevErrors => [] );
        dispatch(createFriendRequest(currentUser.id, username))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                console.log(data)
                if (data?.errors) setErrors(prevErrors => [...prevErrors, ...data.errors]);
                else if (data) setErrors(prevErrors => [...prevErrors, ...data]);
                else {
                    setErrors(prevErrors => [...prevErrors, ...res.statusText]);
                }
            }
            );
        if (errors.length < 1) setSuccess(true)
        else setSuccess(false);
    }
    

    return (
        <div className="friends-container">
            <ul className="friends-list add-friend-list">
                <h1 className="add-friend-header">ADD FRIEND</h1>
                <li>You can add friends with their Kittycord username.</li>
                <div className="search-bar add-friend-search-bar">
                    <input value={username} onChange={handleChange} type="text" placeholder="You can add friends with their Kittycord username." className="search-button add-friend-search-button" />
                    {username === '' ? <div onClick={handleSubmit} className="search-button send-friend-request">Send Friend Request</div> : <div onClick={handleSubmit} className="search-button send-friend-request filled">Send Friend Request</div>}
                </div>
                <ul className="errors">
                    {errors && errors.map((error) => {return <li key={error}>{error}</li>})}
                </ul>
                <ul className="errors">
                    {success && <li className="success-message">Friend request sent!</li>}
                </ul>
            </ul>
        </div>
    )
}