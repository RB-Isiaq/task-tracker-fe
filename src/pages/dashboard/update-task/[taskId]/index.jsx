import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../components/Form";
import { getData, postData } from "../../../../services/ApiClient";
import { AuthCtx } from "../../../../context/authContext";
import { toast } from "react-toastify";

const UpdateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    dueDate: "",
    status: "",
  });
  const { userAuth } = useContext(AuthCtx);

  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await getData(`/tasks/${id}`, userAuth.token);

      setTask(response.task);
    };
    getTaskDetails();
  }, [id, userAuth]);

  const updateTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    try {
      const res = await postData(
        `/tasks/${id}`,
        formData,
        userAuth.token,
        "PATCH"
      );

      if (res.status === 200) {
        toast.success("Task updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      task={task}
      setTask={setTask}
      submitting={submitting}
      handleSubmit={updateTask}
    />
  );
};

export default UpdateTask;
