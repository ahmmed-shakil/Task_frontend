import React, { useState } from "react";
import SelectBox from "../../components/SelectBox/SelectBox";
import "./Form.css";

const Form = () => {
  const [name, setName] = useState("");
  const [sectors, setSectors] = useState([]);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState({});
  const [responseId, setResponseId] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSuubmit = (e) => {
    setData({ name, agree: checked, response: sectors });
    e.preventDefault();

    // POST request using fetch inside useEffect React hook

    if (!saved) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:5000/api/v1/response", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "here");
          setResponseId(data.data._id);
        });

      setName("");
      setSectors([]);
      setChecked(false);
      responseId && fetchResponse(responseId);
      responseId && setSaved(true);
    } else {
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch(
        `http://localhost:5000/api/v1/response/${responseId}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "here");
        });
    }
  };

  // Fetch response
  const fetchResponse = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/api/v1/response/${id}`)
      .then((response) => response.json())
      .then((formData) => {
        const { name, response, agree } = formData.data;
        setName(name);
        setSectors(response);
        setChecked(agree);
      });
  };

  return (
    // Form
    <div className="form-container">
      <form className="form" onSubmit={handleSuubmit}>
        <h3>
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h3>

        {/* Name Input */}
        <div className="name-input">
          <label for={name} style={{ marginRight: "10px" }}>
            <span>Enter your name:</span>
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Select Box */}
        <SelectBox setSectors={setSectors} value={sectors} className="select" />

        {/* Agree to terms checkbox */}
        <div className="check">
          <input
            type="checkbox"
            name="Agree to terms and policies"
            onClick={() => setChecked(!checked)}
            value={!checked}
            checked={checked}
            required
          />
          <label>Agree to terms and policies</label>
        </div>
        <button type="submit">{!saved ? "Save" : "Edit"}</button>
      </form>
    </div>
  );
};

export default Form;
