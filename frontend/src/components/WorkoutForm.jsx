import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [num, setNum] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "swap_cloudinary"); // Replace with your Cloudinary upload preset
    data.append("cloud_name", "dad9jolaq"); // Replace with your Cloudinary cloud name
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dad9jolaq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImageURL = await res.json();
    setUrl(uploadedImageURL.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, quantity, num, url };
    const response = await fetch(
      "https://swap-backend-0y1z.onrender.com/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setQuantity("");
      setNum("");
      setUrl("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <form
      className="create"
      onSubmit={async (e) => {
        await handleSubmit(e);
        if (title && quantity && num && url) {
          window.location.reload();
        }
      }}
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "10px",
        marginRight: "20px",
        maxWidth: "600px",
        width: "90%",
        margin: "20px auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Add a New Stationary
      </h3>

      <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>
        Title:
      </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          transition: "border-color 0.3s ease",
        }}
      />

      <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>
        Quantity:
      </label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes("quantity") ? "error" : ""}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />

      <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>
        Contact Number:
      </label>
      <input
        type="number"
        onChange={(e) => setNum(e.target.value)}
        value={num}
        className={emptyFields.includes("num") ? "error" : ""}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />

      <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>
        Image:
      </label>
      <div className="file-input-container" style={{ marginBottom: "20px" }}>
        <input
          type="file"
          onChange={handleFileUpload}
          accept="image/*"
          className="file-input"
          id="file-upload"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
        />
        <label htmlFor="file-upload" className="file-label"></label>
        {url && (
          <div className="image-preview">
            <img
              src={url}
              alt="Preview"
              style={{
                maxWidth: "100%",
                height: "auto",
                marginTop: "10px",
                borderRadius: "4px",
              }}
            />
          </div>
        )}
      </div>
      <button
        disabled={!url}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: url ? "#4CAF50" : "#cccccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: url ? "pointer" : "not-allowed",
          transition: "background-color 0.3s ease",
          ":hover": {
            backgroundColor: url ? "#45a049" : "#cccccc",
          },
        }}
      >
        Submit
      </button>
      {error && (
        <div
          className="error"
          style={{
            color: "red",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
