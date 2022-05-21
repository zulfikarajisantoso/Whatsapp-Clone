import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = () => {
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-9xl overflow-hidden">
        <div className="grid grid-cols-10 ">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/rooms/:roomid" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Home;
