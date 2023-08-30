import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tasks from "../../components/Tasks";
import { AuthCtx } from "../../context/authContext";
import { getData } from "../../services/ApiClient";
import Loader from "../../assets/icons/loader.svg";
import { InstallPrompt } from "../../components/InstallPrompt";

const UserPage = () => {
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { userAuth } = useContext(AuthCtx);
  const navigate = useNavigate();

  !userAuth.token && navigate("/");
  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const res = await getData("/tasks", `${userAuth.token}`);

        setTasks(res?.tasks || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userAuth]);
  return (
    <section className="relative w-full max-w-[600px] flex items-center flex-col mb-4 min-h-screen">
      <h1 className="mt-10 text-[22px] sm:text-[28px] text-center max-w-[350px] sm:max-w-full">
        Welcome to your dashboard,{" "}
        <span className="orange_gradient">{userAuth?.name || "User"}.</span>
      </h1>
      <Link to="/dashboard/create">
        <button
          type="button"
          className="px-5 py-2 w-[200px] mx-auto mt-6 text-lg bg_green_gradient rounded-full text-white"
        >
          Add new task
        </button>
      </Link>
      <div className="flex flex-col mt-6 w-full sm:w-[450px] px-4">
        <h1 className="mb-2">Sort your tasks by</h1>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="title"
            name="sorting"
            onChange={() => setSort("title")}
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="status"
            name="sorting"
            onChange={() => setSort("status")}
          />
          <label htmlFor="status">Status</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="date"
            name="sorting"
            onChange={() => setSort("date")}
          />
          <label htmlFor="date">Due date</label>
        </div>
      </div>

      {loading ? (
        <img src={Loader} alt="loader" />
      ) : (
        <Tasks sort={sort} data={tasks} />
      )}
      <InstallPrompt />
    </section>
  );
};

export default UserPage;
