import Dm from "./Dm";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min";


export default function DmsIndex() {
    const user = useSelector(state => state.session.user);
    

    return (
        <>
            <h1>Hello from DmsIndex</h1>
            <Link to={`dms/${dmId}`}></Link>
            <Route path="dms/:dmId">
                <Dm />
            </Route>
        </>
    )
}