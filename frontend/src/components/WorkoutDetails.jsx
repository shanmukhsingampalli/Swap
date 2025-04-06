import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "https://swap-backend-0y1z.onrender.com/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div
      className="workout-details"
      style={{
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        margin: "15px 0",
        transition: "all 0.3s ease",
        maxWidth: "400px", // reduced from 600px
        width: "90%", // reduced from 100%
      }}
    >
      <h4
        style={{
          color: "#333",
          fontSize: "1.3rem", // reduced from 1.5rem
          marginBottom: "12px",
          fontWeight: "bold",
        }}
      >
        {workout.title}
      </h4>
      <div
        className="image-container"
        style={{
          width: "90%",
          maxWidth: "250px", // reduced from 300px
          margin: "12px auto",
          padding: "8px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <img
          src={workout.url}
          alt={workout.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: "4px",
            transition: "all 0.3s ease",
          }}
          onClick={() => window.open(workout.url, "_blank")}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.filter = "brightness(1.1)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.filter = "brightness(1)";
          }}
        />
      </div>

      <p
        style={{
          fontSize: "1rem", // reduced from 1.1rem
          margin: "8px 0",
          color: "#555",
        }}
      >
        <strong>Quantity: </strong>
        {workout.quantity}
      </p>
      <p
        style={{
          fontSize: "1rem", // reduced from 1.1rem
          margin: "8px 0",
          color: "#555",
        }}
      >
        <strong>Contact Number: </strong>
        {workout.num}
      </p>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#888",
          fontStyle: "italic",
        }}
      >
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span
        className="material-symbols-outlined"
        onClick={handleClick}
        style={{
          cursor: "pointer",
          color: "#ff4444",
          fontSize: "1.3rem", // reduced from 1.5rem
          padding: "4px",
          borderRadius: "50%",
          transition: "all 0.3s ease",
          ":hover": {
            backgroundColor: "#ffeeee",
            transform: "scale(1.1)",
          },
        }}
      >
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
