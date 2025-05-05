import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
        <Link to="/" style={{ textDecoration: "none" }}>
          <motion.h1
            whileHover={{ scale: 1.05, color: "#1aac83" }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              margin: 0,
              color: "#1aac83",
              cursor: "pointer",
            }}
          >
            Stationary Swap
          </motion.h1>
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <MotionLink to="/products">Products</MotionLink>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  padding: "0.5rem",
                  color: "#1aac83",
                  fontWeight: 500,
                }}
              >
                {user.username}
              </motion.span>

              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "#1aac83",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
              >
                Log out
              </motion.button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <MotionLink to="/help">Help</MotionLink>
              <MotionLink to="/login">Login</MotionLink>
              <MotionLink to="/signup">Signup</MotionLink>
            </div>
          )}
        </nav>
      </div>
    </motion.header>
  );
}

// ✅ Reusable animated Link component (motion)
const MotionLink = ({ to, children }) => (
  <motion.div
    whileHover={{
      scale: 1.1,
      color: "#1aac83",
      rotate: -5,
      boxShadow: "0 0 8px rgba(26, 172, 131, 0.5)",
      transition: { type: "spring", stiffness: 300 },
    }}
    whileTap={{
      scale: 0.95,
      transition: { type: "spring", stiffness: 200 },
    }}
    style={{
      display: "inline-block",
      position: "relative",
      padding: "2px",
      background: "linear-gradient(90deg, #1aac83, #2ecc71)",
      borderRadius: "6px",
    }}
  >
    <Link
      to={to}
      style={{
        fontWeight: "bold",
        fontSize: "clamp(1rem, 2vw, 1.25rem)",
        color: "#333",
        textDecoration: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        transition: "all 0.3s ease",
        background: "#fff",
        display: "block",
      }}
    >
      {children}
    </Link>
  </motion.div>
);

// Animated border styles for navbar
const borderVariants = {
  initial: {
    background: "linear-gradient(90deg, transparent, transparent)",
    padding: "2px",
  },
  animate: {
    background: [
      "linear-gradient(90deg, #1aac83, transparent, transparent, transparent)",
      "linear-gradient(180deg, #1aac83, transparent, transparent, transparent)",
      "linear-gradient(270deg, #1aac83, transparent, transparent, transparent)",
      "linear-gradient(0deg, #1aac83, transparent, transparent, transparent)",
      "linear-gradient(90deg, #1aac83, transparent, transparent, transparent)",
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default Navbar;
