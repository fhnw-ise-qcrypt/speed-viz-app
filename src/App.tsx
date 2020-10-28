import React, {useState} from 'react';
import './App.css';
import BarPlot from './BarPlot';
import RTTPlots from './RTTPlots';

import rtt5s from './testresults/5_ms.json';
import rtt31s from './testresults/31_ms.json';
import rtt78s from './testresults/78_ms.json';
import rtt195s from './testresults/195_ms.json';

const pqTlsTestresults = [rtt5s, rtt31s, rtt78s, rtt195s];
const rtt = [5, 31, 78, 195];

type Kex = {
  name: string,
  data: DataPoint[],
}

type DataPoint = {
  packetLoss: number,
  median: number,
  percent95: number
}

function App() {
  const [chosen, setChosen] = useState<String[]>(["kyber512", "saber"])
  const toggle = (k:string) =>{
    if(chosen.includes(k)){
      setChosen(chosen.filter(d=>d!==k))
    }
    else{
      setChosen([...chosen, k])
    }
  }
  return (
    <div className="App">
      <div className="App-body">
        <h2>oqs-speed Handshake Testresults</h2>
        <BarPlot></BarPlot>
        <h2>pq-tls-benchmark Emulated Network Kex Testresults</h2>
          {
          //@ts-ignore 
            pqTlsTestresults[0].map((kex:Kex)=><button onClick={(e:MouseEvent)=>toggle(e.target.innerHTML)}>{kex.name}</button>)
          }
          {pqTlsTestresults.map((RTTdata, index)=>{
            const filteredData = RTTdata.filter(kex=>chosen.includes(kex.name))
            return <RTTPlots data={filteredData} rtt={rtt[index]}/>
          }
        )}
      </div>
  </div>
  );
}

export default App;
