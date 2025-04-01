import React, { useState } from "react";
import "./Request.css";
import axios from "../../api/axios";

const REQUEST_URL = "/addRequest";
const Request = () => {
  const [date, setDate] = useState("");
  const [memberName, setMemberName] = useState("");
  const [clientName, setClientName] = useState("");
  const [amountRequest, setAmountRequest] = useState("");
  const [payDay, setPayDay] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(REQUEST_URL, {
        request_date: date,
        member: memberName,
        client: clientName,
        amount: amountRequest,
        payday: payDay,
      });
      setSuccess(true);
      setDate("");
      setMemberName("");
      setClientName("");
      setAmountRequest("");
      setPayDay("");
    } catch (error) {
      if (!error.response) {
        setErrorMessage("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMessage("Missing information");
      } else if (error.response?.status === 500) {
        setErrorMessage("Inetrnal Error Occured");
      } else {
        setErrorMessage("Add request failed");
      }
    }
  };

  const handleFocus = () => {
    setSuccess(false);
    setErrorMessage("");
  };

  return (
    <div className="request-container">
      <form className="request-form" onSubmit={handleSubmit}>
        <h2>Request Form</h2>
        {success && (
          <p className="success-message">Request Added Successfully!</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
        <div>
          <label htmlFor="memberName">User Name:</label>
          <select
            type="select"
            id="memberName"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            onFocus={handleFocus}
          >
            <option value="">-- Please select --</option>
            <option value="Ncedo">Ncedo</option>
            <option value="Ab">Abongile</option>
            <option value="Vusi">Vusumzi</option>
            <option value="Max">Masixole</option>
            <option value="Monwa">Monwabisi</option>
            <option value="Mgoli">Vuyisa</option>
            <option value="Marcks">Marcks</option>
            <option value="Sira">Sira</option>
            <option value="Nqaba">Nqaba</option>
          </select>
        </div>
        <div>
          <label htmlFor="clientName">Client Name:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
        <div>
          <label htmlFor="amountRequest">Amount Requested:</label>
          <input
            type="number"
            step="0.01"
            id="amountRequest"
            value={amountRequest}
            onChange={(e) => setAmountRequest(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
        <div>
          <label htmlFor="payDay">Pay Day:</label>
          <select
            type="select"
            id="payDay"
            value={payDay}
            onChange={(e) => setPayDay(e.target.value)}
            onFocus={handleFocus}
          >
            <option value="">Select Pay Day</option>
            {[...Array(31).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Request;
