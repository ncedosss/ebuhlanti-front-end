import React, { useState, useEffect, useContext } from "react";
import "./Requests.css";
import axios from "../../api/axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // For edit and delete icons
import AuthContext from "../../context/AuthProvider";

const REQUESTS_URL = "/getAllRequests";

const Requests = () => {
  const [requestsData, setRequestsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRequest, setEditRequest] = useState(null);
  const { auth } = useContext(AuthContext);
  const rowsPerPage = 7;

  // Fetch requests data from the backend on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Replace with your backend URL (update the port if needed)
        const response = await axios.get(REQUESTS_URL);

        if (response.data && response.data.requests) {
          setRequestsData(response.data.requests);
          setFilteredRequests(response.data.requests);
        } else {
          console.error("No requests found or error fetching data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequests();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = requestsData.filter((request) =>
      request.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Get current requests to be displayed on the current page
  const indexOfLastRequest = currentPage * rowsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - rowsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  // Handle page change
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredRequests.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (requestId) => {
    setSelectedRequests((prevSelected) =>
      prevSelected.includes(requestId)
        ? prevSelected.filter((id) => id !== requestId)
        : [...prevSelected, requestId]
    );
  };

  // Handle delete selected payments
  const handleDelete = async () => {
    try {
      await axios.delete(
        "https://ebuhlanti-97a81317042e.herokuapp.com/deleteRequest",
        {
          data: { ids: selectedRequests },
        }
      );
      // After deletion, refetch payments
      setRequestsData(
        requestsData.filter((request) => !selectedRequests.includes(request.id))
      );
      setSelectedRequests([]); // Clear selected payments
    } catch (error) {
      console.error("Error deleting payments:", error);
    }
  };

  // Handle edit modal open
  const handleEditClick = (request) => {
    setEditRequest(request);
    setShowModal(true);
  };

  // Handle payment edit form submission
  const handleEditSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      await axios.put(
        `https://ebuhlanti-97a81317042e.herokuapp.com/updateRequest/${editRequest.id}`,
        {
          request_date: editRequest.request_date,
          member: editRequest.member_name,
          client_name: editRequest.client_name,
          amount_request: editRequest.amount_request,
          pay_day: editRequest.pay_day,
        }
      );
      // Refetch payments after update
      setRequestsData(
        requestsData.map((request) =>
          request.id === editRequest.id ? editRequest : request
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };
  console.log(editRequest);

  return (
    <div className="requests-container">
      <h2>Requests</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Username"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="requests-table">
        <thead>
          <tr>
            {auth.role === "admin" && <th></th>}
            <th>ID</th>
            <th>Request Date</th>
            <th>Member</th>
            <th>Client</th>
            <th>Amount</th>
            <th>PayDay</th>
            {auth.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentRequests.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          ) : (
            currentRequests.map((request) => (
              <tr key={request.id}>
                {auth.role === "admin" && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRequests.includes(request.id)}
                      onChange={() => handleCheckboxChange(request.id)}
                    />
                  </td>
                )}
                <td>{request.id}</td>
                <td>{request.request_date}</td>
                <td>{request.member_name}</td>
                <td>{request.client_name}</td>
                <td>
                  {request.amount_request ? "R" : ""}
                  {request.amount_request}
                </td>
                <td>{request.pay_day}</td>
                {auth.role === "admin" && (
                  <td>
                    <FaEdit
                      onClick={() => handleEditClick(request)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                    <FaTrashAlt
                      onClick={() => handleDelete()}
                      style={{
                        cursor:
                          selectedRequests.length === 0
                            ? "not-allowed"
                            : "pointer",
                        opacity: selectedRequests.length === 0 ? 0.5 : 1, // Optional: lower opacity when disabled
                      }}
                      className={
                        selectedRequests.length === 0 ? "disabled-icon" : ""
                      }
                      disabled={selectedRequests.length === 0}
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
            currentPage === Math.ceil(filteredRequests.length / rowsPerPage)
          }
        >
          Next
        </button>
      </div>
      {/* Modal for editing payment */}
      {showModal && editRequest && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Request</h2>
            <form className="modal-form" onSubmit={handleEditSubmit}>
              <label>
                Payment Date:
                <input
                  type="date"
                  value={editRequest.request_date}
                  onChange={(e) =>
                    setEditRequest({
                      ...editRequest,
                      request_date: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Member:
                <select
                  type="select"
                  value={editRequest.member_name}
                  onChange={(e) =>
                    setEditRequest({
                      ...editRequest,
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
                  value={editRequest.client_name}
                  onChange={(e) =>
                    setEditRequest({
                      ...editRequest,
                      client_name: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Amount Requested:
                <input
                  type="number"
                  value={editRequest.amount_request}
                  onChange={(e) =>
                    setEditRequest({
                      ...editRequest,
                      amount_request: e.target.value,
                    })
                  }
                />
              </label>
              <label htmlFor="payDay">Pay Day:</label>
              <select
                type="select"
                id="payDay"
                value={editRequest.pay_day}
                onChange={(e) =>
                  setEditRequest({
                    ...editRequest,
                    pay_day: e.target.value,
                  })
                }
              >
                <option value="">Select Pay Day</option>
                {[...Array(31).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
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

export default Requests;
