import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import Sidebarchat from "./Sidebarchat";
import db from "../firebase-config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useStateValue } from "../StaterProvider";

function Sidebar() {
  const [inputt, setinputt] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const createchat = () => {
    const input = prompt("Masukkan Email Anda");

    if (input) {
      addDoc(collection(db, "databaru"), {
        nama: input,
      });
    }
  };

  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "databaru"), (col) => {
      setrooms(
        col.docs.map((d) => ({
          id: d.id,
          data: d.data(),
        }))
      );
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="col-span-3 flex flex-col h-full ">
      <div className="flex justify-between p-4 bg-gray-100">
        {user ? (
          <img src={user.photoURL} alt="" className="w-8 rounded-full" />
        ) : (
          <FaUserCircle className="text-3xl" />
        )}
        <div className="flex space-x-5 items-center">
          <BsFillChatLeftTextFill className="text-1xl cursor-pointer" />
          <FiMoreVertical className="text-1xl cursor-pointer" />
        </div>
      </div>
      <div className="h-14 flex items-center justify-center bg-white">
        <div className=" h-10 flex items-center w-4/5 p-5 rounded-xl bg-gray-100">
          <button>
            {inputt ? (
              <AiOutlineArrowRight className="text-1xl transition-all duration-1000 rotate-180 ease-out" />
            ) : (
              <FiSearch className="text-1xl  " />
            )}
          </button>
          <input
            className="ml-3 flex-1 h-10  bg-transparent outline-none"
            type="text"
            value={inputt}
            onChange={(e) => setinputt(e.target.value)}
            placeholder="Cari atau mulai chat baru"
          />
        </div>
      </div>
      <button
        className="w-full flex justify-center p-3 bg-white"
        onClick={createchat}
      >
        START NEW CHAT
      </button>

      <div className=" flex-1 bg-white overflow-scroll ">
        <Sidebarchat addnewchat />
        {rooms
          .filter((val) => {
            if (inputt == "") {
              return val;
            } else if (
              val.data.nama.toLowerCase().includes(inputt.toLowerCase())
            ) {
              return val;
            }
          })
          .map((rom) => (
            <Sidebarchat key={rom.id} id={rom.id} name={rom.data.nama} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
