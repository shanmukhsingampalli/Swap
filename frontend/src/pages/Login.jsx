import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username.toUpperCase(), password);
  };

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      {/* Background Animation */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(-45deg, #84fab0, #8fd3f4, #a6c0fe, #cfd9df)",
          backgroundSize: "400% 400%",
          zIndex: -1,
        }}
      />

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="login"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              textAlign: "center",
              color: "#1aac83",
              marginBottom: "25px",
              fontSize: "24px",
            }}
          >
            Log In
          </motion.h3>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Username:
            </label>
            <motion.input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              whileFocus={{ scale: 1.02, borderColor: "#1aac83" }}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{ display: "block", marginBottom: "8px", color: "#333" }}
            >
              Password:
            </label>
            <motion.input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              whileFocus={{ scale: 1.02, borderColor: "#1aac83" }}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          <motion.button
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#1aac83",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: "#e7195a",
                textAlign: "center",
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#ffefef",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              {error}
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
