import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [address, setAddress] = useState("");
  const [accessList, setAccessList] = useState([]);

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    if (address) {
      try {
        const tx = await contract.grantAccess(address); // Use the correct function name
        await tx.wait(); // Wait for the transaction to be mined
        alert("Successfully shared access.");
        setModalOpen(false);
      } catch (error) {
        console.error("Error sharing access:", error);
        alert(`Failed to share access. Reason: ${error.message}`);
      }
    } else {
      alert("Please enter a valid address.");
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
