import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/authContext";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const Sidebar = () => {
  const [notes, setNotes] = useState([]);
  const { set,showSidebar } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notes`, {
          withCredentials: true,
        });
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  },[notes]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div  className={`sidebar ${set ? "responsive_sidebar" : " "} `}>
       <button className="side_btn" onClick={showSidebar} >{ set ? <ArrowRightIcon fontSize="large"/> : <ArrowLeftIcon fontSize="large"/> }</button>
      <div className="adding">
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search... " />
        </div>
        <div className="add_div">
          <Link className="add" to="/write">
            Add
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="menu" onClick={showSidebar}>
          {notes.map((note) => (
            <Link className="link" key={note.id} to={`/single-note/${note.id}`}>
              <span className="title">{note.title}</span>
              <p className="description">{getText(note.desc)}</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;