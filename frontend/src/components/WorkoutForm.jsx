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
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "10px",
        marginRight: "20px",
      }}
    >
      <h3>Add a New Stationary</h3>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Quantity:</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes("quantity") ? "error" : ""}
      />

      <label>Contact Number:</label>
      <input
        type="number"
        onChange={(e) => setNum(e.target.value)}
        value={num}
        className={emptyFields.includes("num") ? "error" : ""}
      />
      <label>Image:</label>
      <div className="file-input-container">
        <input
          type="file"
          onChange={handleFileUpload}
          accept="image/*"
          className="file-input"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="file-label"></label>
        {url && (
          <div className="image-preview">
            <img
              src={url}
              alt="Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          </div>
        )}
      </div>
      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
