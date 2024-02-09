import "./home.scss";
import pic from "../../image/pic.png"
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
const Home = () => {
   
  return (
    <div className="home">  
          <div className="image" >
            <img src={pic} alt="" />
          </div>
          <div className="text" >
            <h1>Add or open Notes</h1>
          </div>
          <div className="note_add">

            <Link to="/write">
              <AddIcon className="add_icon" fontSize="large"/>
            </Link>

          </div>
    </div>
  );
};

export default Home;
