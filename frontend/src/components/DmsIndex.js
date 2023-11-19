import Dm from "./Dm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min";


export default function DmsIndex() {
    const user = useSelector(state => state.session.user);
    const dms = useSelector(state => 
        Object.values(state.dms).filter((dm) => {
            dm.members.includes(user.id);
        }))
    // const { dmId } = useParams();

    return (
        <>
            <Link to="/channels">Channels</Link>
            
            <h1>Hello from DmsIndex</h1>
            <Route path="/dms/:dmId">
                <Dm />
            </Route>
        </>
    )
}