import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [address, setAddress] = useState("");
  const [accessList, setAccessList] = useState([]);

  const sharing = async () => {
    if (address) {
      try {
        await contract.allow(address);
        setModalOpen(false);
      } catch (error) {
        console.error("Error sharing access:", error);
        alert("Failed to share access.");
      }
    } else {
      alert("Please enter an address.");
    }
  };

  useEffect(() => {
    const fetchAccessList = async () => {
      try {
        const addressList = await contract.shareAccess();
        setAccessList(addressList);
      } catch (error) {
        console.error("Error fetching access list:", error);
      }
    };
    if (contract) {
      fetchAccessList();
    }
  }, [contract]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share with</div>
        <div className="body">
          <input
            type="text"
            className="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <form id="myForm">
          <select id="selectNumber">
            <option>People With Access</option>
            {accessList.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </form>
        <div className="footer">
          <button
            onClick={() => setModalOpen(false)}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={sharing}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
