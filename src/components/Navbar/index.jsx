import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../store/slices/authSlice";

import "./index.css";

const Navbar = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div>MENU</div>
      <div>
        {isAuth ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <div>{`${user.name} (${user.username})`}</div>
            <div
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => dispatch(logout())}
            >
              Logout
            </div>
          </div>
        ) : (
          <div>Not connected</div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
