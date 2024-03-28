import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "./../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setISError] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      //signup mode
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Account is created");
          navigate("/home");
        })
        .catch((err) => toast.error(err.message));
    } else {
      // signin mode
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Account logged in");
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.message);
          setISError(true);
        });
    }
  };

  const sendEmail = () => {
    //sifre sifirlama
    sendPasswordResetEmail(auth, email).then(() => {
      toast.info("Check your email please");
    });
  };

  //google ile giris
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      toast.success("Account logged in");
      navigate("/home");
    });
  };

  return (
    <section className="flex place-items-center justify-center h-screen py-16 px-32">
      <div className="bg-black flex parent rounded-xl">
        <div className="w-1/3 flex flex-col items-center justify-center ">
          <div>
            <img className="h-[400px] " src="/public/x-logo.webp" alt="" />
          </div>
        </div>

        <div className="right w-2/3 flex items-center justify-center flex-col gap-3 py-10 px-20">
          <h1 className="font-bold text-xl my-8">Happening now</h1>

          <div className="flex items-center justify-center flex-col gap-2 py-10 px-20">
            <button
              onClick={handleGoogle}
              className="bg-white flex items-center py-2 px-10 rounded-full transition hover:bg-gray-300"
            >
              <img className="h-[20px]" src="/public/google-logo.svg" alt="" />
              <span className="text-black whitespace-nowrap ms-2">
                Sign up with Google
              </span>
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col mt-8">
              <label>Email</label>
              <input
                className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="mt-5">Password</label>
              <input
                className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
                type="password"
                onChange={(e) => setPass(e.target.value)}
              />
              <button
                className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300 w-[200px]"
                type="submit"
              >
                {isSignUp ? "Sign up" : "Sign in"}
              </button>
              <p onClick={() => setIsSignUp(!isSignUp)}>
                <span className="text-gray-500">
                  {isSignUp ? "Already have Account" : ""}{" "}
                </span>
                <span className="ms-1 text-blue-500 cursor-pointer ">
                  {isSignUp ? "Sign in" : "Sign up"}
                </span>
              </p>
            </form>

            {!isSignUp && isError && (
              <button
                onClick={sendEmail}
                className="cursor-pointer text-red-500 hover:text-red-300"
              >
                Forget Password ?
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
