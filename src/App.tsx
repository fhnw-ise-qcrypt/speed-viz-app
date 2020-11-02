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
  return (
    <div className="App">
      <div className="App-body">
        <h1>oqs-speed Handshake Testresults</h1>
        <BarPlot></BarPlot>
        <h1> </h1>
        <h1> </h1>
        <h1>pq-tls-benchmark Emulated Network Kex Testresults</h1>
        <NetworkPerformancePlots/>
      </div>
  </div>
  );
}

const NetworkPerformancePlots = () =>{
  const [chosen, setChosen] = useState<String[]>(["prime256v1"])
  const toggle = (k:string) =>{
    if(chosen.includes(k)){
      setChosen(chosen.filter(d=>d!==k))
    }
    else{
      setChosen([...chosen, k])
    }
  }
  return(
    <>
      <div className={"button-panel"}>
        {// Create Buttons for all available Kexs
        //@ts-ignore 
          pqTlsTestresults[0].map((kex:Kex)=><div className={chosen.includes(kex.name)? "button-active button" :"button"} onClick={(e:MouseEvent)=>{e.preventDefault(); return toggle(e.target.innerHTML)}}>{kex.name}</div>)
        }
      </div>
      {// Display Data. For every RTT two Plots, one for median, one for 95 percentile.
        pqTlsTestresults.map((RTTdata, index)=>{
          const filteredData = RTTdata.filter(kex=>chosen.includes(kex.name))
          return <RTTPlots data={filteredData} rtt={rtt[index]}/>
        }
      )}
    </>
  )
}
export default App;
