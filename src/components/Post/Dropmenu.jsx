import { BiTrash } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";

BiTrash;

const Dropmenu = ({ handleDelete, handleEdit }) => {
  return (
    <div className="paste-button">
      <button className="button">... </button>
      <div className="dropdown-content">
        <a id="top" className="top" href="#">
          <span onClick={handleDelete}>Delete</span>
        </a>
        <a id="middle" className="middle" href="#">
          <span onClick={handleEdit}>Edit</span>
        </a>
      </div>
    </div>
  );
};

export default Dropmenu;
