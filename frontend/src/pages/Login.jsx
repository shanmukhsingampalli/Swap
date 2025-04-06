import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
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
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s",
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
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "16px",
              transition: "border-color 0.3s",
              outline: "none",
              ":focus": {
                borderColor: "#1aac83",
              },
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
              transition: "border-color 0.3s",
              outline: "none",
              ":focus": {
                borderColor: "#1aac83",
              },
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
            borderRadius: "8px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            transition: "background-color 0.3s",
            ":hover": {
              backgroundColor: "#158463",
            },
          }}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        {error && (
          <div
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
          </div>
        )}
      </form>
    </div>
  );
};
export default Login;
