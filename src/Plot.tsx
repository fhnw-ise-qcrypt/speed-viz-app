import React, {useState} from 'react';
import * as d3 from 'd3';
import data from './handshakes_pretty.json';

const sig=Object.entries(data)[0][0]
const sigs=Object.entries(data)

type dataEntry = [string, number];
type Props = {
}

const Plot: React.FC<Props> = () =>{
  const [chosenSig, setChosenSig]=useState<string>(sigs[0][0])
  //@ts-ignore
  const entriesAsList=Object.entries(data[chosenSig]).sort()

  const width=1000;
  const height=500;
  const marginLeft=20;
  const marginRight=10;
  const marginTop=10;
  const marginBottom=80;
  const boundedWidth=width-marginLeft-marginRight;
  const boundedHeight=height-marginTop-marginBottom;
  const barWidth = boundedWidth/13-2;
  const xAccessor=(d:dataEntry)=>d[0]
  const yAccessor=(d:dataEntry)=>d[1]
  //@ts-ignore
  const yScale = d3.scaleLinear().domain(d3.extent(entriesAsList, yAccessor))//gives us min max
    .range([0, boundedHeight-20])
    .nice()

  return(
    <>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
        {
        //@ts-ignore
        sigs.map((sig, index)=><button onClick={(e:MouseEvent)=>setChosenSig(e.target.innerHTML)} key={index}>{sig[0]}</button>)
        }
      </div>
      <p style={{color: "white"}}>{chosenSig}</p>      
      <div className="plot">
        <svg style={{backgroundColor: "#282c34", borderRadius: "5px"}} width={width} height={height}>
          <g transform={`translate(${marginLeft}, ${marginTop})`}>
            {entriesAsList.map((entry, index)=>{
              //@ts-ignore
              const barHeight = yScale(yAccessor(entry))
              return(
                <g transform={`translate(${index/13*boundedWidth}, 0)`} key={index}>
                  //@ts-ignore
                  <rect style={{fill: "red"}} y={boundedHeight-barHeight} width={barWidth} height={barHeight} rx={5}></rect>
                  //@ts-ignore
                  <text style={{fontSize: "12px", fontWeight: "bold", textAnchor: "middle", fill: "red"}} x={barWidth/2} y={boundedHeight-barHeight-5}>{yAccessor(entry)}</text>
                  //@ts-ignore
                  <text style={{fill: "white", transformOrigin: "top left", transform: `translate(${barWidth/2}px, ${boundedHeight+10}px) rotate(-45deg)`, fontSize: "10px", fontWeight: "bold", textAnchor: "end"}}>{xAccessor(entry)}</text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>
    </>
  );
}

export default Plot;
