import React , {useState, useEffect} from 'react';
import * as d3 from 'd3';

import LinePlot from './LinePlot';
//import data from './testresults/5_ms.json';

type Props = {
  data: any,
  rtt: number
}

type Kex = {
  name: string,
  data: DataPoint[],
}

type DataPoint = {
  packetLoss: number,
  median: number,
  percent95: number
}

const RTTPlots: React.FC<Props> = ({data, rtt}) =>{

  const medianAccessor=(d:DataPoint)=>d.median;
  const percent95Accessor=(d:DataPoint)=>d.percent95;
  const packetLossAccessor = (d:DataPoint) => d.packetLoss;
  
  const smallestFirst = (a:any, b:any) => a-b;

  const maxMedian:number = data.map((kex:Kex)=>d3.extent(kex.data, medianAccessor)[1]).sort(smallestFirst).slice(-1)[0] as number;
  const maxPercent95:number = data.map((kex:Kex)=>d3.extent(kex.data, percent95Accessor)[1]).sort(smallestFirst).slice(-1)[0] as number;

  const xDomain = [-1, 20];
  const yDomain1 = [0, maxMedian];
  const yDomain2 = [0, maxPercent95];
  const xLabel = "Packet Loss [%]";
  const yLabel = "Handshake Completion Time [ms]";
  

  return(
    <div style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly"}}>
      <LinePlot data={data} title={`RTT ${rtt}ms, Median`} xLabel={xLabel} yLabel={yLabel} xDomain={xDomain} yDomain={yDomain1} xAccessor={packetLossAccessor} yAccessor={medianAccessor}></LinePlot>
      <LinePlot data={data} title={`RTT ${rtt}ms, 95 Percentile`} xLabel={xLabel} yLabel={yLabel} xDomain={xDomain} yDomain={yDomain2} xAccessor={packetLossAccessor} yAccessor={percent95Accessor}></LinePlot>
    </div>
  )
}

export default RTTPlots;
