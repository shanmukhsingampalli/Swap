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
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <div
        className="image-container"
        style={{
          width: "100%",
          maxWidth: "200px",
          margin: "15px auto",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          },
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

      <p>
        <strong>Quantity: </strong>
        {workout.quantity}
      </p>
      <p>
        <strong>Contact Number: </strong>
        {workout.num}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
