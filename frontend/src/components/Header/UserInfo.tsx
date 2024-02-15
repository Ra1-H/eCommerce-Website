import React, { useState } from "react";
import { useCommerceStore } from "../../store";
import { useNavigate } from "react-router-dom";



function UserInfo() {
  
  const { setToken,userName } = useCommerceStore();
  const navigate = useNavigate();

  const [showButtons, setShowButtons] = useState(false);


  // TODO
  const handleChangePicture = () => {
    
  };

  const handleToggleButtons = () => {
    setShowButtons((prevShowButtons) => !prevShowButtons);
  };

  const handleLogout = () => {
    setToken("");
    navigate("/auth/login");
  };

  const handleCreateStore = () => {
    navigate("/create-store");
  };


  return (
    <div style={{ position: "relative" }}>
     
      <div className="profile-container flex" onClick={handleToggleButtons}>
       
        <div className="rounded-full p-1" >
          <img src="/profile.png" width={40} alt="user" />
        </div>
        {showButtons && (
          <div className="UserInfo-modal">
            <button onClick={handleLogout} className="form-button">Logout</button>
            <button onClick={handleCreateStore} className="form-button">Create Store</button>
            <button onClick={handleChangePicture} className="form-button">Change picture</button>
          </div>
        )}
        <div>{userName}</div>
      </div>
    </div>
  );
}

export default UserInfo;
