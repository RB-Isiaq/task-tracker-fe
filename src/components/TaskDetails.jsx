import { Link } from "react-router-dom";
const TaskDetails = ({ data, deleteHandler, deleting }) => {
  const paragraphs = data?.desc?.split(/\n/);
  return (
    <section className="grid place-items-center min-h-screen border border-solid border-green-100 my-4 sm:w-[450px] w-full">
      <div className="relative w-full flex flex-col gap-6 justify-center items-center py-10  glassmorphism">
        <Link to="/dashboard">
          <button
            type="button"
            className="absolute top-3 left-4 px-6 py-1 text-[16px] bg-black rounded-full text-white"
          >
            back
          </button>
        </Link>
        <h1 className="capitalize text-center font-semibold text-2xl mb-2 mt-2">
          {data?.title}
        </h1>
        <div className="w-full text-justify">
          {paragraphs?.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="flex justify-between gap-8 items-center w-full">
          <div className="flex gap-2 items-center">
            <div
              className={`w-[10px] h-[10px] rounded-full ${
                data?.status === "Completed"
                  ? "bg-green-500"
                  : data?.status === "In progress"
                  ? "bg-blue-500"
                  : "bg-red-400"
              }`}
            />
            <span>{data?.status}</span>
          </div>
          <span>{data?.dueDate}</span>
        </div>
        <div className="flex justify-between w-full">
          <Link to={`/dashboard/update/${data?._id}`}>
            <button
              type="button"
              className="px-6 py-1 text-lg bg-blue-400 rounded-full text-white"
            >
              edit
            </button>
          </Link>
          <button
            type="button"
            className="px-6 py-1 text-lg bg-red-500 rounded-full text-white"
            onClick={deleteHandler}
          >
            {deleting ? "deleting" : "delete"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaskDetails;
