import { db } from "../db.js";
import jwt from "jsonwebtoken";

//get all notes
export const getNotes = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "unauthorize token not provided" });
  }

  try {
    const decoded = jwt.verify(token, "jwtkey");
    const userId = decoded.id;
    const q = "SELECT * FROM note WHERE note.uid=?";

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(401).json({ message: "unautorize invalid token" });
  }
};

//get single note
export const getNote = (req, res) => {
 
  
  const q =
    "SELECT n.id,`title`, `desc`,`date` FROM users u JOIN note n ON u.id = n.uid WHERE n.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addNote = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO note(`title`, `desc`,`date`,`uid`) VALUES (?)";

    const values = [req.body.title, req.body.desc, req.body.date, userInfo.id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deleteNote = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const noteId = req.params.id;
    const q = "DELETE FROM note WHERE `id` = ? AND `uid` = ?";

    db.query(q, [noteId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updateNote = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "UPDATE note SET `title`=?,`desc`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
