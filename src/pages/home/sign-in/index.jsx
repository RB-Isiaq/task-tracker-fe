import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthCtx } from "../../../context/authContext";
import { postData } from "../../../services/ApiClient";
import { toast } from "react-toastify";

const SignIn = ({ toggle }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [value, setValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signing, setSigning] = useState(false);
  const { userAuth, setUserAuth } = useContext(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    setSuccess(userAuth?.msg);
    setValue(userAuth?.username || "");
  }, [userAuth]);

  const handSubmit = async (e) => {
    e.preventDefault();
    setSigning(true);
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    try {
      const res = await postData("/auth/login", formData);

      if (res.status === 200) {
        setSuccess(res.msg);
        setUserAuth({
          token: res.token,
          name: res.user.name,
        });
        toast.success(`Welcome back, ${res.user.name || "user"}`);
        navigate("/dashboard");
      } else {
        setError(res.msg);
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
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
        <h1 className="text-lg blue_gradient text-center">
          {success ? success : "Welcome Back"}
        </h1>
        <input
          type="username"
          placeholder="username"
          required
          name="username"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
          show password
        </label>
        <div className="flex justify-between gap-10">
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg_blue_gradient rounded-full text-white w-max shadow-lg"
          >
            {signing ? "Signing In" : "Sign In"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-400">{error}</p>}
      <p>
        Don't have an account?{" "}
        <span className="orange_gradient cursor-pointer" onClick={toggle}>
          Sign Up
        </span>
      </p>
    </>
  );
};

export default SignIn;
