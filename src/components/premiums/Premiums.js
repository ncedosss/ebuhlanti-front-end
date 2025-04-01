import React, { useState, useEffect, useContext } from "react";
import "./Premiums.css"; // Assuming you have the correct CSS
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // For edit and delete icons
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
const PREMIUMS_URL = "/getAllPremiums";

const Premiums = () => {
  const [premiumsData, setPremiumsData] = useState([]); // To store fetched payments
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPremiums, setFilteredPremiums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // To show modal for editing
  const [editPremium, setEditPremium] = useState(null); // To store payment details for editing
  const [selectedPremiums, setSelectedPremiums] = useState([]); // To track selected payments
  const { auth } = useContext(AuthContext);
  const rowsPerPage = 7;

  // Fetch premiums data from the backend on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(PREMIUMS_URL);

        if (response.data && response.data.premiums) {
          setPremiumsData(response.data.premiums);
          setFilteredPremiums(response.data.premiums);
        } else {
          console.error("No premiums found or error fetching data.");
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

    const filtered = premiumsData.filter((premium) =>
      premium.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPremiums(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Get current payments to be displayed on the current page
  const indexOfLastPayment = currentPage * rowsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - rowsPerPage;
  const currentPayments = filteredPremiums.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  // Handle page change
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPremiums.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle edit modal open
  const handleEditClick = (payment) => {
    setEditPremium(payment);
    setShowModal(true);
  };

  // Handle payment edit form submission
  const handleEditSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      await axios.put(
        `https://ebuhlanti-97a81317042e.herokuapp.com/updatePremium/${editPremium.id}`,
        {
          payment_date: editPremium.payment_date,
          member: editPremium.username,
          amount: editPremium.amount_paid,
          description: editPremium.Description,
        }
      );
      // Refetch payments after update
      setPremiumsData(
        premiumsData.map((premium) =>
          premium.id === editPremium.id ? editPremium : premium
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  // Handle delete selected payments
  const handleDelete = async () => {
    console.log(selectedPremiums);
    try {
      await axios.delete(
        `https://ebuhlanti-97a81317042e.herokuapp.com/deletePremium`,
        {
          data: {
            ids: selectedPremiums,
          },
        }
      );
      // After deletion, refetch payments
      setPremiumsData(
        premiumsData.filter((payment) => !selectedPremiums.includes(payment.id))
      );
      setSelectedPremiums([]); // Clear selected payments
    } catch (error) {
      console.error("Error deleting payments:", error);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (paymentId) => {
    setSelectedPremiums((prevSelected) =>
      prevSelected.includes(paymentId)
        ? prevSelected.filter((id) => id !== paymentId)
        : [...prevSelected, paymentId]
    );
  };

  return (
    <div className="requests-container">
      <h2>Premiums</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Member Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="premiums-table">
        <thead>
          <tr>
            {auth.role === "admin" && <th></th>}
            <th>ID</th>
            <th>Payment Date</th>
            <th>Member</th>
            <th>Amount Paid</th>
            <th>Description</th>
            {auth.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentPayments.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          ) : (
            currentPayments.map((premium) => (
              <tr key={premium.id}>
                {auth.role === "admin" && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPremiums.includes(premium.id)}
                      onChange={() => handleCheckboxChange(premium.id)}
                    />
                  </td>
                )}
                <td>{premium.id}</td>
                <td>{premium.payment_date}</td>
                <td>{premium.username}</td>
                <td>
                  {premium.amount_paid ? "R" : ""}
                  {premium.amount_paid}
                </td>
                <td>{premium.Description}</td>
                {auth.role === "admin" && (
                  <td>
                    <FaEdit
                      onClick={() => handleEditClick(premium)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                    <FaTrashAlt
                      onClick={() => handleDelete()}
                      style={{
                        cursor:
                          selectedPremiums.length === 0
                            ? "not-allowed"
                            : "pointer",
                        opacity: selectedPremiums.length === 0 ? 0.5 : 1, // Optional: lower opacity when disabled
                      }}
                      className={
                        selectedPremiums.length === 0 ? "disabled-icon" : ""
                      }
                      disabled={selectedPremiums.length === 0}
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
            currentPage === Math.ceil(filteredPremiums.length / rowsPerPage)
          }
        >
          Next
        </button>
      </div>
      {/* Modal for editing payment */}
      {showModal && editPremium && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Premium</h2>
            <form className="modal-form" onSubmit={handleEditSubmit}>
              <label>
                Payment Date:
                <input
                  type="date"
                  value={editPremium.payment_date}
                  onChange={(e) =>
                    setEditPremium({
                      ...editPremium,
                      payment_date: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Member:
                <select
                  type="select"
                  value={editPremium.member_name}
                  onChange={(e) =>
                    setEditPremium({
                      ...editPremium,
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
                Amount Paid:
                <input
                  type="number"
                  value={editPremium.amount_paid}
                  onChange={(e) =>
                    setEditPremium({
                      ...editPremium,
                      amount_paid: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  value={editPremium.Description}
                  onChange={(e) =>
                    setEditPremium({
                      ...editPremium,
                      Description: e.target.value,
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

export default Premiums;
