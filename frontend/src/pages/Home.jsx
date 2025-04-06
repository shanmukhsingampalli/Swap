import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutDetails from "../components/WorkoutDetails";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://swap-backend-0y1z.onrender.com/api/workouts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);
  return (
    <div
      className="home"
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: window.innerWidth <= 768 ? "column" : "row",
        gap: "20px",
      }}
    >
      <div
        className="workout-form-container"
        style={{
          width: window.innerWidth <= 768 ? "100%" : "300px",
          position: "sticky",
          top: "20px",
          height: "fit-content",
        }}
      >
        <WorkoutForm />
      </div>
      <div
        className="workouts"
        style={{
          flex: "1",
          display: "grid",
          gap: "20px",
          gridTemplateColumns:
            window.innerWidth <= 480
              ? "1fr"
              : "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
}
export default Home;
