import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "./write.scss";

const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const navigate = useNavigate();

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     state
  //       ? await axios.put(`http://localhost:5000/api/notes/${state.id}`, {
  //           title,
  //           desc: value,
  //         },{withCredentials:true})

  //       : await axios.post(`http://localhost:5000/api/notes/`, {
  //           title,
  //           desc: value,
  //           date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //         },{withCredentials:true});

  //           navigate(`/`);

  //   } catch (err) {
  //     console.log(err);
  //   }

  // };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/notes/${state.id}`,
      {
        title,
        desc: value,
      },
      { withCredentials: true }
    );

    navigate(`/single-note/${state.id}`);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await axios.post(
      `http://localhost:5000/api/notes/`,
      {
        title,
        desc: value,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      },
      { withCredentials: true }
    );

    navigate("/");
  };

  return (
    <div className="write">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        {state ? (
          <button onClick={handleUpdate} className=" btn_u">
            update
          </button>
        ) : (
          <button onClick={handleSave} className="bt">
            save
          </button>
        )}
      </div>

      <div className="operations">
        <span>operations</span>

        <div className="buttons">
          {state ? (
            <button onClick={handleUpdate} className="btn_s">
              Update
            </button>
          ) : (
            <button onClick={handleSave} className="btn_u">
              Save
            </button>
          )}
        </div>
        <div className="preferences">
          <span>preferences</span>
        </div>
      </div>
    </div>
  );
};

export default Write;
