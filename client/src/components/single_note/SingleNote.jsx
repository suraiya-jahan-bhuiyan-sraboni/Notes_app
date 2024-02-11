import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DOMPurify from "dompurify";
import "./single_note.scss";
import { AuthContext } from "../../context/authContext";

const SingleNote = () => {
  const [note, setNote] = useState({});
  const {fetchData} = useContext(AuthContext);
  const Navigate = useNavigate();
  const location = useLocation();

  const noteId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notes/${noteId}`
        );
        setNote(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [noteId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
        withCredentials: true,
      });
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
    fetchData()
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single_note">
      <div className="note_container">
        <div className="title">

        <h1> {note.title} </h1>
        </div>
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.desc) }}
        ></p>
      </div>
      <Link to={`/write?edit=2`} className="edit" state={note}>
        <EditIcon fontSize="large" />
      </Link>
      <button onClick={handleDelete} className="dlt">
        <DeleteOutlineIcon fontSize="large" />
      </button>
    </div>
  );
};

export default SingleNote;
