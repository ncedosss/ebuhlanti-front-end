import React, { useState } from "react";
import "./Premium.css";
import axios from "../../api/axios";

const PREMIUM_URL = "/addPremium";
const Premium = () => {
  const [date, setDate] = useState("");
  const [memberName, setMemberName] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [fees, setFees] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(PREMIUM_URL, {
        payment_date: date,
        member: memberName,
        amount: amountPaid,
        description: description,
        bank_fees: fees,
      });
      setSuccess(true);
      setDate("");
      setMemberName("");
      setAmountPaid("");
      setFees("");
      setDescription("");
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
    <div className="premium-container">
      <form className="premium-form" onSubmit={handleSubmit}>
        <h2>Premium Form</h2>
        {success && (
          <p className="success-message">Premium Added Successfully!</p>
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
          <label htmlFor="amountPaid">Amount Paid:</label>
          <input
            type="number"
            step="0.01"
            id="amountPaid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            step="0.01"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
        <div>
          <label htmlFor="bankFees">Bank Fees:</label>
          <input
            type="number"
            step="0.01"
            id="bankFees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            onFocus={handleFocus}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Premium;
