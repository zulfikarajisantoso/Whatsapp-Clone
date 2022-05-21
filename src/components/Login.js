import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StaterProvider";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signin = () => {
    signInWithPopup(auth, provider).then((res) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: res.user,
      });
    });
  };

  return (
    <div className="p-10 flex  flex-col justify-center items-center h-screen w-full">
      <div className="flex items-center justify-center flex-col space-y-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png"
          alt=""
        />
        <button onClick={signin} className="px-4 py-1 border-3  bg-white">
          Sign in with Google
        </button>
      </div>
      <div className="absolute bottom-20 flex flex-col items-center w-100%">
        <h6 className="text-gray-400">from</h6>
        <h4
          className=" font-bold italic text-green-500"
          style={{ letterSpacing: "10px" }}
        >
          ZASSL
        </h4>
      </div>
    </div>
  );
}

export default Login;
