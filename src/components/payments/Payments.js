import React, { useState, useEffect, useContext } from "react";
import "./Payments.css"; // Assuming you have the correct CSS
import axios from "../../api/axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // For edit and delete icons
import AuthContext from "../../context/AuthProvider";

const PAYMENTS_URL = "/getAllPayments";

const Payments = () => {
  const [paymentsData, setPaymentsData] = useState([]); // To store fetched payments
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const [selectedPayments, setSelectedPayments] = useState([]); // To track selected payments
  const [showModal, setShowModal] = useState(false); // To show modal for editing
  const [editPayment, setEditPayment] = useState(null); // To store payment details for editing
  const { auth } = useContext(AuthContext);

  // Fetch payments data from the backend on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(PAYMENTS_URL);
        if (response.data && response.data.payments) {
          setPaymentsData(response.data.payments);
          setFilteredPayments(response.data.payments);
        } else {
          console.error("No payments found or error fetching data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPayments();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = paymentsData.filter((payment) =>
      payment.member_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPayments(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Get current payments to be displayed on the current page
  const indexOfLastPayment = currentPage * rowsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - rowsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  // Handle page change
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPayments.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (paymentId) => {
    setSelectedPayments((prevSelected) =>
      prevSelected.includes(paymentId)
        ? prevSelected.filter((id) => id !== paymentId)
        : [...prevSelected, paymentId]
    );
  };

  // Handle delete selected payments
  const handleDelete = async () => {
    try {
      await axios.delete(
        "https://ebuhlanti-97a81317042e.herokuapp.com/deletePayment",
        {
          data: { ids: selectedPayments },
        }
      );
      // After deletion, refetch payments
      setPaymentsData(
        paymentsData.filter((payment) => !selectedPayments.includes(payment.id))
      );
      setSelectedPayments([]); // Clear selected payments
    } catch (error) {
      console.error("Error deleting payments:", error);
    }
  };

  // Handle edit modal open
  const handleEditClick = (payment) => {
    setEditPayment(payment);
    setShowModal(true);
  };

  // Handle payment edit form submission
  const handleEditSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      console.log(editPayment);
      await axios.put(
        `https://ebuhlanti-97a81317042e.herokuapp.com/updatePayment/${editPayment.id}`,
        {
          payment_date: editPayment.payment_date,
          member: editPayment.member_name,
          client_name: editPayment.client_name,
          amount_paid: editPayment.amount_paid,
          request_id: editPayment.request_id,
        }
      );
      // Refetch payments after update
      setPaymentsData(
        paymentsData.map((payment) =>
          payment.id === editPayment.id ? editPayment : payment
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  return (
    <div className="requests-container">
      <h2>Payments</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Member Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="payments-table">
        <thead>
          <tr>
            {auth.role === "admin" && <th></th>}
            <th>ID</th>
            <th>Payment Date</th>
            <th>Member</th>
            <th>Client</th>
            <th>Amount Paid</th>
            <th>Linked Request</th>
            {auth.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentPayments.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          ) : (
            currentPayments.map((payment) => (
              <tr key={payment.id}>
                {auth.role === "admin" && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPayments.includes(payment.id)}
                      onChange={() => handleCheckboxChange(payment.id)}
                    />
                  </td>
                )}
                <td>{payment.id}</td>
                <td>{payment.payment_date}</td>
                <td>{payment.member_name}</td>
                <td>{payment.client_name}</td>
                <td>{payment.amount_paid ? "R" + payment.amount_paid : ""}</td>
                <td>{payment.request_id}</td>
                {auth.role === "admin" && (
                  <td>
                    <FaEdit
                      onClick={() => handleEditClick(payment)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                    <FaTrashAlt
                      onClick={() => handleDelete()}
                      style={{
                        cursor:
                          selectedPayments.length === 0
                            ? "not-allowed"
                            : "pointer",
                        opacity: selectedPayments.length === 0 ? 0.5 : 1, // Optional: lower opacity when disabled
                      }}
                      className={
                        selectedPayments.length === 0 ? "disabled-icon" : ""
                      }
                      disabled={selectedPayments.length === 0}
                    />
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(filteredPayments.length / rowsPerPage)
          }
        >
          Next
        </button>
      </div>

      {/* Modal for editing payment */}
      {showModal && editPayment && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Payment</h2>
            <form className="modal-form" onSubmit={handleEditSubmit}>
              <label>
                Payment Date:
                <input
                  type="date"
                  value={editPayment.payment_date}
                  onChange={(e) =>
                    setEditPayment({
                      ...editPayment,
                      payment_date: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Member:
                <select
                  type="select"
                  value={editPayment.member_name}
                  onChange={(e) =>
                    setEditPayment({
                      ...editPayment,
                      member_name: e.target.value,
                    })
                  }
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
              </label>
              <label>
                Client:
                <input
                  type="text"
                  value={editPayment.client_name}
                  onChange={(e) =>
                    setEditPayment({
                      ...editPayment,
                      client_name: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Amount Paid:
                <input
                  type="number"
                  value={editPayment.amount_paid}
                  onChange={(e) =>
                    setEditPayment({
                      ...editPayment,
                      amount_paid: e.target.value,
                    })
                  }
                />
              </label>
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
