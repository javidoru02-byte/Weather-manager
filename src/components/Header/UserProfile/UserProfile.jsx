import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
  const navigate = useNavigate();

  function onLogout() {
    navigate("/auth");
  }

  return (
    <div className="userProfile">
      <span>привіт</span>
      <button onClick={onLogout} title="Вийти">вийти</button>
    </div>
  );
}

export default UserProfile;