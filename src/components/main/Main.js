import "./Main.css";
import "../request/Request.css";
import hello from "../../assets/person-wave-svgrepo-com.svg";
import Chart from "../charts/Chart";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import Request from "../request/Request";
import Payment from "../payment/Payment";
import Requests from "../requests/Requests";
import Receivables from "../receivables/Receivables";
import Payments from "../payments/Payments";
import Premium from "../premium/Premium";
import Premiums from "../premiums/Premiums";
import axios from "axios";

const Main = ({
  showRequest,
  showPayment,
  showRequests,
  showReceivables,
  showPayments,
  showPremium,
  showPremiums,
}) => {
  const [atb, setAtb] = useState(0); // State to store ATB value
  const [totalRequests, setTotalRequests] = useState(0); // State to store ATB value
  const [totalPaid, setTotalPaid] = useState(0); // State to store ATB value
  const [outstanding, setOutstanding] = useState(0); // State to store ATB value
  const [arrears, setArrears] = useState(0); // State to store ATB value
  const [premiumArrears, setPremiumArrears] = useState(0); // State to store ATB value
  const [expectedAmount, setExpectedAmount] = useState(0); // State to store ATB value
  const [guaranteedSplit, setGuaranteedSplit] = useState(0); // State to store ATB value
  const { auth } = useContext(AuthContext);

  // Fetch the ATB value when the component mounts
  useEffect(() => {
    const fetchATB = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `https://ebuhlanti-97a81317042e.herokuapp.com/getATB/${auth.user}`
        );

        if (response.status === 200) {
          setAtb(response.data.atb); // Set the ATB value in the state
        } else {
          console.error("Error fetching ATB:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching ATB:", error);
      }
    };

    if (auth.user) {
      fetchATB(); // Fetch ATB if there's a user logged in
    }
  }, [auth.user]); // The effect runs when the auth.user changes

  useEffect(() => {
    const fetchATB = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `https://ebuhlanti-97a81317042e.herokuapp.com/getTotalDisbursed/${auth.user}`
        );

        if (response.status === 200) {
          setTotalRequests(response.data.totalRequest); // Set the Total Requests value in the state
        } else {
          console.error(
            "Error fetching Total Requests:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching Total Requests:", error);
      }
    };

    if (auth.user) {
      fetchATB(); // Fetch Total Requests if there's a user logged in
    }
  }, [auth.user]); // The effect runs when the auth.user changes

  useEffect(() => {
    const fetchATB = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `https://ebuhlanti-97a81317042e.herokuapp.com/getTotalPayments/${auth.user}`
        );

        if (response.status === 200) {
          setTotalPaid(response.data.totalPaid); // Set the Total Requests value in the state
        } else {
          console.error(
            "Error fetching Total Requests:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching Total Requests:", error);
      }
    };

    if (auth.user) {
      fetchATB(); // Fetch Total Requests if there's a user logged in
    }
  }, [auth.user]); // The effect runs when the auth.user changes

  useEffect(() => {
    const fetchATB = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `https://ebuhlanti-97a81317042e.herokuapp.com/getTotalOutstanding/${auth.user}`
        );

        if (response.status === 200) {
          setOutstanding(response.data.outstanding); // Set the Total Requests value in the state
        } else {
          console.error(
            "Error fetching Total Requests:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching Total Requests:", error);
      }
    };

    if (auth.user) {
      fetchATB(); // Fetch Total Requests if there's a user logged in
    }
  }, [auth.user]); // The effect runs when the auth.user changes

  useEffect(() => {
    const fetchArrears = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `https://ebuhlanti-97a81317042e.herokuapp.com/getArrearsAmount/${auth.user}`
        );

        if (response.status === 200) {
          setArrears(response.data.arrears); // Set the Total Requests value in the state
        } else {
          console.error(
            "Error fetching Total Requests:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching Total Requests:", error);
      }
    };

    if (auth.user) {
      fetchArrears(); // Fetch Total Requests if there's a user logged in
    }
  }, [auth.user]); // The effect runs when the auth.user changes

  useEffect(() => {
    const fetchPremiumArrears = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `https://ebuhlanti-97a81317042e.herokuapp.com/getPremiumArrearsAmount/${auth.user}`
        );

        if (response.status === 200) {
          setPremiumArrears(response.data.premiumArrears); // Set the Total Requests value in the state
        } else {
          console.error(
            "Error fetching Total Premium Arrears:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching Total Premium Arrears:", error);
      }
    };

    if (auth.user) {
      fetchPremiumArrears(); // Fetch Total Requests if there's a user logged in
    }
  }, [auth.user]); // The effect runs when the auth.user changes

  useEffect(() => {
    const fetchExpectedAmount = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `https://ebuhlanti-97a81317042e.herokuapp.com/getExpectedAmount/${auth.user}`
        );

        if (response.status === 200) {
          setExpectedAmount(response.data.expectedAmount); // Set the Total Requests value in the state
        } else {
          console.error(
            "Error fetching Total Premium Arrears:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching Total Premium Arrears:", error);
      }
    };

    if (auth.user) {
      fetchExpectedAmount(); // Fetch Total Requests if there's a user logged in
    }
  }, [auth.user]); // The effect runs when the auth.user changes

  useEffect(() => {
    const fetchGuaranteedSplit = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `https://ebuhlanti-97a81317042e.herokuapp.com/getGuaranteedSplit/${auth.user}`
        );

        if (response.status === 200) {
          setGuaranteedSplit(response.data.guaranteedSplit); // Set the Total Requests value in the state
        } else {
          console.error(
            "Error fetching Total Expected Amount:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching Total Expected Amount:", error);
      }
    };

    if (auth.user) {
      fetchGuaranteedSplit(); // Fetch Total Requests if there's a user logged in
    }
  }, [auth.user]); // The effect runs when the auth.user changes

  return (
    <main>
      <div className="main_container">
        <div className="main_title">
          <img src={hello} alt="hello" />
          <div className="main_greeting">
            <h1>Hello {auth.user}</h1>
            <p>Welcome to your dashboard</p>
          </div>
        </div>

        <div className="main_cards">
          <div className="card">
            <i
              className={
                arrears >= 0
                  ? "fa fa-thumbs-up fa-2x text-lightblue"
                  : "fa fa-thumbs-down fa-2x text-danger"
              }
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Arrears Amount</p>
              <span className="font-bold text-title">R{arrears}</span>{" "}
              {/* Display the ATB value */}
            </div>
          </div>

          <div className="card">
            <i className="fa fa-money fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Total Disbursements</p>
              <span className="font-bold text-title">R{totalRequests}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-money fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Total Paid</p>
              <span className="font-bold text-title">R{totalPaid}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-clock-o fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Amount Due</p>
              <span className="font-bold text-title">R{expectedAmount}</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="charts_left">
            <div className="chart_left_title">
              <div>
                <h1>Payment Graph</h1>
                <p>South Africa</p>
              </div>
              <i className="fa fa-money"></i>
            </div>
            <Chart />
          </div>

          <div className="charts_right">
            <div className="chart_right_title">
              <div>
                <h1>Stats Reports</h1>
                <p>South Africa</p>
              </div>
              <i className="fa fa-rsa"></i>
            </div>

            <div className="chart_right_cards">
              <div className={atb < 0 ? "card4" : "card2"}>
                <h1>ATB Available</h1>
                <p>R{atb}</p>
              </div>

              <div className={premiumArrears < 0 ? "card4" : "card2"}>
                <h1>Premium Arrears</h1>
                <p>R{premiumArrears}</p>
              </div>

              <div className="card3">
                <h1>Total Outstanding</h1>
                <p>R{outstanding}</p>
              </div>

              <div className={guaranteedSplit < 0 ? "card4" : "card2"}>
                <h1>Guaranteed Split</h1>
                <p>R{guaranteedSplit}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="request_container">{showRequest && <Request />}</div>
        <div className="payment_container">{showPayment && <Payment />}</div>
        <div className="requests_container">{showRequests && <Requests />}</div>
        <div className="receivables_container">
          {showReceivables && <Receivables />}
        </div>
        <div className="receivables_container">
          {showPayments && <Payments />}
        </div>
        <div className="receivables_container">
          {showPremium && <Premium />}
        </div>
        <div className="receivables_container">
          {showPremiums && <Premiums />}
        </div>
      </div>
    </main>
  );
};

export default Main;
