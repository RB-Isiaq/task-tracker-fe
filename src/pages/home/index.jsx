import SignIn from "./sign-in";
import SignUp from "./sign-up";
import { useState } from "react";

const Home = () => {
  const [signIn, setSignIn] = useState(true);

  const toggleSignIn = () => {
    setSignIn((prev) => !prev);
  };
  return (
    <section className="w-full flex-center flex-col pb-4">
      <h1 className="head_text text-center">
        Task
        <span className="orange_gradient text_center"> Tracker</span>
      </h1>
      <p className="desc text-center">
        Stay organized and boost your productivity with our task tracker app.
        Easily manage your tasks, deadlines, and progress all in one place. With
        our intuitive interface, you can create, edit, and prioritize tasks
        effortlessly.
      </p>

      <p className="text-xl my-8">
        Please{" "}
        <span className="orange_gradient">
          {signIn ? "sign in" : "sign up"}{" "}
        </span>
        to continue
      </p>

      {signIn ? (
        <SignIn toggle={toggleSignIn} />
      ) : (
        <SignUp toggle={toggleSignIn} />
      )}
    </section>
  );
};

export default Home;
