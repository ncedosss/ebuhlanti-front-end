import React, { useState } from "react";
import "./Payment.css";
import axios from "../../api/axios";

const PAYMENT_URL = "/addPayment";
const REQUESTS_URL = "/getUserRequests";
const Payment = () => {
  const [date, setDate] = useState("");
  const [memberName, setMemberName] = useState("");
  const [request, setRequest] = useState("");
  const [clientName, setClientName] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [requestsData, setRequestsData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(PAYMENT_URL, {
        payment_date: date,
        member: memberName,
        client: clientName,
        amount: amountPaid,
        request_id: request,
      });
      setSuccess(true);
      setDate("");
      setMemberName("");
      setClientName("");
      setAmountPaid("");
      setLinkedRequest("");
      setRequest("");
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

  const setLinkedRequest = async (user) => {
    try {
      // Replace with your backend URL
      const response = await axios.get(`${REQUESTS_URL}/${user}`);

      if (response.data && response.data.requests) {
        setRequestsData(response.data.requests);
      } else {
        console.error("No requests found or error fetching data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Payment Form</h2>
        {success && (
          <p className="success-message">Payment Added Successfully!</p>
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
            onChange={(e) => {
              setMemberName(e.target.value);
              setLinkedRequest(e.target.value);
            }}
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
          <label htmlFor="linkedRequest">Linked Request:</label>
          <select
            type="select"
            id="linkedRequest"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            onFocus={handleFocus}
          >
            <option value="">-- Please select --</option>
            {requestsData.map((request, index) => (
              <option key={index} value={request.id}>
                {request.request_date + " - R" + request.amount_request}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Payment;
