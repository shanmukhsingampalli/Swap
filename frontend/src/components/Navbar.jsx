import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header
      style={{
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#1aac83",
            transition: "color 0.3s",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              margin: 0,
            }}
          >
            Stationary Swap
          </h1>
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/products"
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "#333",
                  textDecoration: "none",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  transition: "all 0.3s",
                  ":hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Products
              </Link>
              <span
                style={{
                  padding: "0.5rem",
                  color: "#1aac83",
                  fontWeight: 500,
                }}
              >
                {user.username}
              </span>
              <button
                onClick={handleClick}
                style={{
                  background: "#1aac83",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background 0.3s",
                  ":hover": {
                    backgroundColor: "#158463",
                  },
                }}
              >
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/help"
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "#333",
                  textDecoration: "none",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  transition: "all 0.3s",
                  ":hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Help
              </Link>
              <Link
                to="/login"
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "#333",
                  textDecoration: "none",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  transition: "all 0.3s",
                  ":hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "#333",
                  textDecoration: "none",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  transition: "all 0.3s",
                  ":hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Navbar;
