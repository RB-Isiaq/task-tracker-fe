import { useNavigate, useParams } from "react-router-dom";
import TaskDetails from "../../../components/TaskDetails";
import { useState, useEffect, useContext } from "react";
import { getData, postData } from "../../../services/ApiClient";
import { AuthCtx } from "../../../context/authContext";
import { toast } from "react-toastify";

const TaskDetail = () => {
  const [task, setTask] = useState({});
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  const { userAuth } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await getData(`/tasks/${id}`, userAuth.token);

      setTask(response.task);
    };

    getTaskDetails();
  }, [id, userAuth]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const response = await postData(
        `/tasks/${id}`,
        {},
        userAuth.token,
        "DELETE"
      );
      if (response.status === 200) {
        toast.success("Task deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <TaskDetails data={task} deleteHandler={handleDelete} deleting={deleting} />
  );
};

export default TaskDetail;
