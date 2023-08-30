import { useContext, useState } from "react";
import { AuthCtx } from "../../../context/authContext";
import { toast } from "react-toastify";

const SignUp = ({ toggle }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [signing, setSigning] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUserAuth } = useContext(AuthCtx);

  const handSubmit = async (e) => {
    e.preventDefault();
    setSigning(true);
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await res.json();

      if (res.status === 201) {
        setSuccess(responseData.msg);
        setUserAuth({
          token: responseData.token,
          username: responseData.user.username,
          msg: responseData.user.msg,
        });
        toast.success(success, {
          position: toast.POSITION.TOP_RIGHT,
        });
        toggle();
      } else {
        console.log("Registration failed");
        setError(responseData.msg);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setSigning(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handSubmit}
        action="post"
        className="flex flex-col gap-4 items-center mb-4 w-full sm:w-[550px]"
      >
        <h1 className="text-lg blue_gradient">Get Started</h1>
        <input
          type="text"
          placeholder="name"
          required
          name="name"
          className="search_input peer"
          autoFocus
        />
        <input
          type="username"
          placeholder="username"
          required
          name="username"
          className="search_input peer"
        />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="password"
          required
          name="password"
          className="search_input peer"
        />
        <label>
          <input
            type="checkbox"
            checked={passwordVisible}
            onChange={() => setPasswordVisible(!passwordVisible)}
          />{" "}
          Show Password
        </label>
        <button
          type="submit"
          className="px-5 py-1.5 text-sm bg_blue_gradient rounded-full text-white w-max shadow-lg"
        >
          {signing ? "Signing Up" : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-400">{error}</p>}
      {success && <p className="text-green-400">{success}</p>}
      <p>
        Already have an account?{" "}
        <span className="orange_gradient cursor-pointer" onClick={toggle}>
          Sign In
        </span>
      </p>
    </>
  );
};

export default SignUp;
