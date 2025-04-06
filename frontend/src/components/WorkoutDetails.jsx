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
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
      }}
    >
      <h4
        style={{
          fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
          color: "#333",
          marginBottom: "15px",
        }}
      >
        {workout.title}
      </h4>
      <div
        className="image-container"
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "15px auto",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
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
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.parentElement.style.boxShadow =
              "0 8px 16px rgba(0,0,0,0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.parentElement.style.boxShadow =
              "0 2px 4px rgba(0,0,0,0.1)";
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: "10px",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
        }}
      >
        <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <strong>Quantity:</strong>
          <span>{workout.quantity}</span>
        </p>
        <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <strong>Contact Number:</strong>
          <span>{workout.num}</span>
        </p>
        <p style={{ color: "#666", fontSize: "0.9em" }}>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <span
        className="material-symbols-outlined"
        onClick={handleClick}
        style={{
          cursor: "pointer",
          padding: "8px",
          borderRadius: "50%",
          backgroundColor: "#ff00001a",
          color: "#ff0000",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#ff00003a";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#ff00001a";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
