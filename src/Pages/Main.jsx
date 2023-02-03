
import { Link } from "react-router-dom";

const Main = () => {
    return (<>
        <div className="RegLog">
            <div className="RegLog_buttons">
                <button><Link to="/register">Register</Link></button>
                <button> <Link to="/login">Login</Link></button>
            </div>
        </div>

    </>);
}

export default Main;