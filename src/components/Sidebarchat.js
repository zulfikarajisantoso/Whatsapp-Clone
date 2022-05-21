import {
  collection,
  doc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase-config";

function Sidebarchat({ id, name, addnewchat }) {
  const [ava, setava] = useState("");
  const [lastmess, setlastmess] = useState("");

  useEffect(() => {
    setava(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      const yah = doc(db, "databaru", id);

      onSnapshot(
        query(collection(yah, "message"), orderBy("timestamp", "desc")),
        (doc) => {
          setlastmess(doc.docs.map((d) => d.data()));
        }
      );
    }
  }, [id]);

  return addnewchat ? (
    <div></div>
  ) : (
    <Link to={`/rooms/${id}`}>
      <div className="h-20 flex items-center hover:bg-gray-100">
        <div className="">
          <img
            className="w-16 h-16 p-1 rounded-full"
            src={`https://avatars.dicebear.com/api/human/${ava}.svg`}
            alt=""
          />
        </div>
        <div className="flex flex-col p-4 border-b-2 flex-1">
          <h6>{name}</h6>
          <p>{lastmess[0]?.message}</p>
        </div>
      </div>
    </Link>
  );
}

export default Sidebarchat;
