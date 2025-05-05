import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { motion } from "framer-motion";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username.toUpperCase(), password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "20px",
      }}
    >
      <motion.form
        className="signup"
        onSubmit={handleSubmit}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 150 }}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            color: "#1aac83",
            marginBottom: "25px",
            fontSize: "24px",
          }}
        >
          Sign up
        </h3>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontSize: "16px",
            }}
          >
            Username:
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontSize: "16px",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
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
            transition: "background-color 0.3s",
          }}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </motion.button>

        {error && (
          <motion.div
            className="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
  );
};

export default Signup;
