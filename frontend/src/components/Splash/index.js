import Background from "../../assets/background";
import Foreground from "../../assets/foreground";
import Shoe from "../../assets/shoe";
import Logo from "../../assets/full_logo_white_RGB";
import BlackLogo from "../../assets/636e0b5061df290f5892d944_full_logo_black_RGB";
import { Link } from "react-router-dom";


function Splash() {
    return (
        <>
            <div className="splash-wrapper">
                <Link to="/login"><p className="login">Login</p></Link>
                <div className="splash-text-wrapper">
                    <h1 className="splash-header">IMAGINE A PLACE...</h1>
                    <p className="splash-text">...where you can belong to a school club, a gaming group, or a worldwide art community. 
                        Where just you and a handful of friends can spend time together. 
                        A place that makes it easy to talk every day and hang out more often.</p>
                </div>
                <Background />
                <Foreground />
                <Shoe />
                {/* <BlackLogo /> */}
            </div>
        </>
    )
}

export default Splash;