import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

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
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1664303228218-c7eedbffe762?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with any green stationery image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        className="login"
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            color: "#2f6f4e",
            marginBottom: "25px",
            fontSize: "26px",
            fontWeight: "600",
          }}
        >
          Log In
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
              border: "2px solid #d0e4d0",
              borderRadius: "10px",
              fontSize: "16px",
              outline: "none",
              backgroundColor: "#f8fff8",
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
              border: "2px solid #d0e4d0",
              borderRadius: "10px",
              fontSize: "16px",
              outline: "none",
              backgroundColor: "#f8fff8",
            }}
          />
        </div>

        <button
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#67c18c",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            transition: "background-color 0.3s",
          }}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        {error && (
          <div
            style={{
              color: "#e7195a",
              backgroundColor: "#fff1f3",
              textAlign: "center",
              marginTop: "20px",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
