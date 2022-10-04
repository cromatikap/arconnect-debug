import './App.css';
import Arweave from 'arweave';
import { useState } from 'react';

import LARGE_DATA from './largeData';

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

function App() {
  const [addr, setaddr] = useState<string | null>(null);
  
  const connectWallet = async () => {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS','ACCESS_ALL_ADDRESSES','SIGN_TRANSACTION','DISPATCH'])
    setaddr(await window.arweaveWallet.getActiveAddress())
  }

  const sendTx = async () => {
    try {
      let tx = await arweave.createTransaction({ data: LARGE_DATA })
      let result = await window.arweaveWallet.dispatch(tx);
      console.log(result);
    }
    catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <button onClick={connectWallet}>Connect</button>
      {addr && <>
        <>connected</>
        <button onClick={sendTx}>send tx</button>
      </>}
    </div>
  );
}

export default App;
