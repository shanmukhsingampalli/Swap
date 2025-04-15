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
          "url('https://plus.unsplash.com/premium_photo-1664303228218-c7eedbffe762?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          transition: "transform 0.2s",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            color: "#ffffff",
            marginBottom: "25px",
            fontSize: "26px",
            fontWeight: "600",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Log In
        </h3>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#f0f0f0",
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
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              background: "rgba(255, 255, 255, 0.9)",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#f0f0f0",
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
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              background: "rgba(255, 255, 255, 0.9)",
              outline: "none",
            }}
          />
        </div>

        <button
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1aac83",
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
              color: "#fff",
              backgroundColor: "rgba(231, 25, 90, 0.8)",
              textAlign: "center",
              marginTop: "20px",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
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
