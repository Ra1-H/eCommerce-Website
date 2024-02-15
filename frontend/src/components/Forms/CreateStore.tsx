import React, { useState } from "react";
import { useCommerceStore } from "../../store";

function CreateStore() {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    location: "",
    logo: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const { token } = useCommerceStore();

  function handleCreateStore(e: any) {
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("location", inputs.location);
    formData.append("logo", inputs.logo);

    fetch("http://locallhost:3001/api/v1/stores/create", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response._id) {
          // If the response contains an _id, consider it a success
          setSuccessMessage("Store created successfully!");
        }
      })
      .catch((error) => {
        console.error("Error creating store:", error);
        setSuccessMessage("Failed to create store. Please try again."); // Set an error message
      });
  }
  return (
    <div className="create-store form-container">
      <form className="form">
        {successMessage && (
          <div style={{ color: "green" }}>{successMessage}</div>
        )}
        <span className="form-span">
          <label htmlFor="store-name" style={{ color: "#a6a6a6" }}>
            Store Name
          </label>
          <input
            type="text"
            name="store-name"
            value={inputs.name}
            id="store-name"
            className="form-inputs"
            onChange={(e) => {
              setInputs({ ...inputs, name: e.target.value });
            }}
          ></input>
        </span>
        <span className="form-span">
          <label htmlFor="store-description" style={{ color: "#a6a6a6" }}>
            Store Description
          </label>
          <textarea
            name="store-dexcription"
            value={inputs.description}
            cols={25}
            rows={2}
            id="store-description"
            className="form-inputs"
            onChange={(e) => {
              setInputs({ ...inputs, description: e.target.value });
            }}
          ></textarea>
        </span>
        <span className="form-span">
          <label htmlFor="store-location" style={{ color: "#a6a6a6" }}>
            Store Location
          </label>
          <input
            type="text"
            name="store-location"
            value={inputs.location}
            className="form-inputs"
            onChange={(e) => {
              setInputs({ ...inputs, location: e.target.value });
            }}
          ></input>
        </span>

        <span className="form-span">
          <label htmlFor="store-logo" style={{ color: "#a6a6a6" }}>
            Store Logo
          </label>
          <input
            type="file"
            name="store-logo"
            className="form-inputs p-1"
            // @ts-ignore
            onChange={(e) => setInputs({ ...inputs, logo: e.target.files[0] })}
          ></input>
        </span>
        <button
          type="button"
          onClick={handleCreateStore}
          className="form-button"
        >
          Create Store
        </button>
      </form>
    </div>
  );
}

export default CreateStore;
