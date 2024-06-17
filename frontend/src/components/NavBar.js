import { Link } from "react-router-dom";
import { UseLogout } from "../hooks/UseLogOut";
const NavBar = () => {
  const { Logout } = UseLogout();
  const handleLogoutClick = () => {
    Logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleLogoutClick}>Logout</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
