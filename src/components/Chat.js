import React, { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineInsertEmoticon, MdSend } from "react-icons/md";
import { CgAttachment } from "react-icons/cg";
import { BsFillMicFill } from "react-icons/bs";
import db from "../firebase-config";
import {
  doc,
  addDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useStateValue } from "../StaterProvider";
import { serverTimestamp } from "firebase/firestore";

function Chat() {
  const [rubah, setrubah] = useState(false);
  const [input, setinput] = useState("");
  const [ava, setava] = useState("");
  const [mess, setmessage] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  let { roomid } = useParams();
  const [roomName, setroomName] = useState("");

  useEffect(() => {
    if (roomid) {
      onSnapshot(doc(db, "databaru", roomid), (doc) => {
        setroomName(doc.data().nama);
      });

      const yah = doc(db, "databaru", roomid);

      onSnapshot(
        query(collection(yah, "message"), orderBy("timestamp", "asc")),
        (doc) => {
          setmessage(doc.docs.map((d) => d.data()));
        }
      );
    } else console.log("error");
  }, [roomid]);

  const berubah = (e) => {
    setrubah(e.target.value);
    setinput(e.target.value);
  };

  const tambahchat = (e) => {
    e.preventDefault();

    const ya = doc(db, "databaru", roomid);

    addDoc(collection(ya, "message"), {
      message: input,
      nama: user.displayName,
      timestamp: serverTimestamp(),
    });
    setinput("");
  };

  useEffect(() => {
    setava(Math.floor(Math.random() * 5000));
  }, [roomid]);

  return (
    <div className="col-span-7 flex flex-col h-screen ">
      {/* chat hedaer */}
      <div className="bg-gray-100 h-16 flex  items-center">
        <div className="flex justify-between w-full p-6">
          <div className="flex items-center ">
            <div>
              <img
                src={`https://avatars.dicebear.com/api/human/${ava}.svg`}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex flex-col p-4">
              <h6>{roomName}</h6>
              <p>
                last seen{" "}
                {new Date(
                  mess[mess.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <GrSearch className="text-1xl" />
            <FiMoreVertical className="text-1xl" />
          </div>
        </div>
      </div>
      {/* chat body */}
      <div className="bodychat">
        {mess.map((me, index) => (
          <p
            key={index}
            className={`  relative mb-2 text-md p-2 pb-1 pt-6 w-fit rounded-lg bg-white ${
              me.nama === user.displayName && "ml-auto bgnya"
            }  `}
          >
            <span className="absolute top-0 font-extrabold">{me.nama}</span>
            {me.message}
            <span className="text-xs ml-5 ">
              {new Date(me.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      {/* chat footer */}
      <div className="  h-14 items-center flex w-full bg-gray-100 ">
        <div className="flex p-4 gap-4">
          <button>
            <MdOutlineInsertEmoticon className="text-2xl" />
          </button>
          <button>
            <CgAttachment className="text-2xl" />
          </button>
        </div>
        <form className="flex w-full h-3/4 ">
          <input
            className="p-3 border-none outline-none rounded-lg w-11/12"
            type="text"
            name="ty"
            value={input}
            placeholder="Ketik pesan"
            onChange={berubah}
          />

          <button className="p-3" onClick={tambahchat}>
            {rubah ? (
              <MdSend className="text-2xl" />
            ) : (
              <BsFillMicFill className="text-2xl" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
