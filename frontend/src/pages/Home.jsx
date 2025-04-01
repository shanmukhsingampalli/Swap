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
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <div className="workout-form-container" style={{ marginRight: "20px" }}>
        <WorkoutForm />
      </div>
    </div>
  );
}
export default Home;
