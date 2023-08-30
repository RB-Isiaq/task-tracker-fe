import { Link } from "react-router-dom";

const Form = ({ type, task, setTask, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col glassmorphism">
      <h1 className="head_text text-left ">
        <span className="blue_gradient">{type} Task</span>
      </h1>
      <p className="desc text-left max-w-md">{type} your task today.</p>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 "
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title
          </span>
          <input
            value={task?.title}
            type="text"
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="write your task title here"
            required
            name="title"
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            value={task?.desc}
            onChange={(e) => setTask({ ...task, desc: e.target.value })}
            placeholder="write your task description here"
            required
            name="desc"
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Due date
          </span>
          <input
            value={task?.dueDate}
            type="date"
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            required
            name="dueDate"
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Status
          </span>
          <select
            name="status"
            id=""
            value={task?.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            className="form_input"
          >
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link to="/dashboard" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? "Saving..." : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
