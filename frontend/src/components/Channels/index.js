import { useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";

export default function Channels() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        // dispatch(fetchCurrentUser())
    })

    return (
        <>
            {/* {user.servers.map((serverId) => {
                return <Link to={`/servers/{serverId}`}></Link>
            })} */}
            <h1>Hello from Channels</h1>
        </>
    )
}