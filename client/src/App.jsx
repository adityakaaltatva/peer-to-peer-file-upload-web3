import { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import Upload from './artifacts/contracts/Upload.sol/Upload.json';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        setAccount(address);

        const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(signer);
      } else {
        alert("Metamask is not installed");
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="app">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
