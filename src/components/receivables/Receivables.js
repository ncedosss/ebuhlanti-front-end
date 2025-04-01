import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Receivables.css";

const Receivables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchReceivables = async () => {
      try {
        const response = await axios.get(
          "https://ebuhlanti-97a81317042e.herokuapp.com/getAllReceivables"
        );
        const data = response.data;

        if (data.requests) {
          const updatedRequests = [];
          const userBalances = {}; // Track user balance by username

          data.requests.forEach((request) => {
            const totalExpected = request.amount_paid
              ? request.amount_paid * 1.3
              : 0;

            if (!userBalances[request.username]) {
              userBalances[request.username] = {
                accumulatedTotal: 0,
                outstandingBalance: 0,
              };
            }

            // Calculate accumulated total based on each request
            userBalances[request.username].accumulatedTotal += totalExpected;

            // Calculate current outstanding balance for the user
            let outstandingBalance =
              userBalances[request.username].accumulatedTotal;

            // Only subtract repayment if there was one
            if (request.amount_repaid > 0) {
              outstandingBalance -= request.amount_repaid;
            }

            // Update the user's outstanding balance in userBalances
            userBalances[request.username].outstandingBalance =
              outstandingBalance;

            userBalances[request.username].accumulatedTotal =
              outstandingBalance;

            // Add request with computed totals and balances
            updatedRequests.push({
              ...request,
              TotalExpected: totalExpected.toFixed(2),
              OutstandingAmount: outstandingBalance.toFixed(2),
            });
          });

          setAllRequests(updatedRequests);
          setFilteredRequests(updatedRequests);
        }
      } catch (error) {
        console.error("Error fetching receivables:", error);
      }
    };

    fetchReceivables();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = allRequests.filter((request) =>
      request.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRequests(filtered);
    setCurrentPage(1);
  };

  const indexOfLastRequest = currentPage * rowsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - rowsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

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

  return (
    <div className="requests-container">
      <h2>Receivables</h2>
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
            <th>ID</th>
            <th>Payment Date</th>
            <th>Amount Paid</th>
            <th>Total Expected</th>
            <th>Repayment Date</th>
            <th>Amount Repaid</th>
            <th>Outstanding Balance</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          ) : (
            currentRequests.map((request) => {
              const paymentDate = request.payment_date
                ? new Date(request.payment_date)
                : null;
              const repaymentDate = request.repayment_date
                ? new Date(request.repayment_date)
                : null;

              return (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>
                    {paymentDate && !isNaN(paymentDate.getTime())
                      ? paymentDate.toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    {request.amount_paid ? "R" : ""}
                    {request.amount_paid}
                  </td>
                  <td>
                    {request.TotalExpected > 0 ? "R" : ""}
                    {request.TotalExpected > 0 ? request.TotalExpected : ""}
                  </td>
                  <td>
                    {repaymentDate &&
                    repaymentDate instanceof Date &&
                    !isNaN(repaymentDate)
                      ? repaymentDate.toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    {request.amount_repaid ? "R" : ""}
                    {request.amount_repaid}
                  </td>
                  <td>
                    {request.OutstandingAmount ? "R" : ""}
                    {request.OutstandingAmount}
                  </td>
                  <td>{request.username}</td>
                </tr>
              );
            })
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
    </div>
  );
};

export default Receivables;
