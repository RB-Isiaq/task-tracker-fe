import { useContext, useState } from "react";
import Form from "../../../components/Form";
import { postData } from "../../../services/ApiClient";
import { AuthCtx } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTask = () => {
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    dueDate: "",
    status: "",
  });
  const { userAuth } = useContext(AuthCtx);
  const navigate = useNavigate();

  const createTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    try {
      const res = await postData("/tasks", formData, userAuth.token);

      if (res.status === 201) {
        toast.success("Task created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.success("Failed to create !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      task={task}
      setTask={setTask}
      submitting={submitting}
      handleSubmit={createTask}
    />
  );
};

export default CreateTask;
