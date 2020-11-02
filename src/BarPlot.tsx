import React, {useState, useRef} from 'react';
import * as d3 from 'd3';
import data from './testresults/handshakes_pretty.json';
import {useTransition, animated} from 'react-spring';

type dataEntry = [string, number];
const sigs=Object.entries(data)
console.log(sigs)
//@ts-ignore
const maxValue=1/Math.min(...sigs
  .map((sig)=>sig[1])
  .map(kem=>Object.values(kem))
  .map(v=>Math.min(...v)))
console.log(maxValue)
//const max=Math.max(allValues);
//console.log(max)
type Props = {
}

type BarGroupProps = {
  boundedWidth: number, 
  boundedHeight: number
}

const BarPlot: React.FC<Props> = () =>{
  const [chosenSig, setChosenSig]=useState<string[]>([sigs[0][0], sigs[0][0]])
  //@ts-ignore
  const entriesAsList:dataEntry[]=Object.entries(data[chosenSig[0]]).sort()
  //@ts-ignore
  const prevEntriesAsList:dataEntry[]=Object.entries(data[chosenSig[1]]).sort()

  const width=1000;
  const height=500;
  const marginLeft=20;
  const marginRight=10;
  const marginTop=10;
  const marginBottom=100;
  const boundedWidth=width-marginLeft-marginRight;
  const boundedHeight=height-marginTop-marginBottom;
  const barWidth = boundedWidth/13;
  const xAccessor=(d:dataEntry)=>d[0]
  const yAccessor=(d:dataEntry)=>1/d[1]
  //@ts-ignore
  const yScale = d3.scaleLinear().domain(d3.extent(entriesAsList, yAccessor))//gives us min max
    .range([0, boundedHeight-20])
    .nice()
  //@ts-ignore
  const prevYScale = d3.scaleLinear().domain(d3.extent(prevEntriesAsList, yAccessor))//gives us min max
    .range([0, boundedHeight-20])
    .nice()
  //@ts-ignore
  const colorScale = d3.scaleLinear().domain([0, 0.040]).range([0.2, 0.8]).clamp(true);//more than 20ms will be red

  //@ts-ignore
  const BarGroup: React.FC<BarGroupProps> = ({boundedHeight, boundedWidth}) =>{
    //@ts-ignore
    const transition = useTransition(
      //@ts-ignore
      entriesAsList.map((d, index)=>({prevHeight: prevYScale(yAccessor(prevEntriesAsList[index] as dataEntry)), prevY: boundedHeight-prevYScale(yAccessor(prevEntriesAsList[index] as dataEntry)), height: yScale(yAccessor(d as dataEntry)), y: boundedHeight-yScale(yAccessor(d as dataEntry))})),
      //@ts-ignore
      (entry, index) => index,
      {
        from: ({prevHeight, prevY})=>({height: prevHeight, y: prevY}),
        //@ts-ignore
        //@ts-ignore
        enter: ({height, y})=>({height, y}),
        //@ts-ignore
        update: ({height, y})=>({height, y}),
      }
    )
    //@ts-ignore
    return transition.map(({item, props, key}, index)=>
          <g transform={`translate(${index/13*boundedWidth}, 0)`} key={index}>
            //@ts-ignore
            <animated.rect key={key} style={{...props, fill:`${d3.interpolateReds(colorScale(yAccessor(entriesAsList[index])))}`}} width={barWidth-2} rx={5}></animated.rect>
                //@ts-ignore
                <animated.text y={props.y} style={{...props, transform: "translate(0px, -10px)", fontSize: "12px", fontWeight: "bold", textAnchor: "middle", fill:`${d3.interpolateReds(colorScale(yAccessor(entriesAsList[index])))}`}} x={barWidth/2}>{(yAccessor(entriesAsList[index])*1000).toString().slice(0,5)}ms</animated.text>
                //@ts-ignore
                <text style={{fill: "white", transformOrigin: "top left", transform: `translate(${barWidth/2}px, ${boundedHeight+10}px) rotate(-45deg)`, fontSize: "15px", fontWeight: "bold", textAnchor: "end"}}>{xAccessor(entriesAsList[index])}</text>
              </g>
    )
  }


  return(
    <>
      <div className={"button-panel"}>
        {
        //@ts-ignore
          sigs.map((sig, index)=><div className={chosenSig[0]===sig[0]? "button-active button":"button"} onClick={(e:MouseEvent)=>setChosenSig([e.target.innerHTML,...chosenSig].slice(0,2))} key={index}>{sig[0]}</div>)
        }
      </div>
      <h3 style={{color: "white"}}>{chosenSig[0]}</h3>      
      <div className="plot">
        <svg style={{backgroundColor: "#282c34", borderRadius: "5px"}} width={width} height={height}>
          <g transform={`translate(${marginLeft}, ${marginTop})`}>
            <BarGroup boundedWidth={boundedWidth} boundedHeight={boundedHeight}></BarGroup>
          </g>
        </svg>
      </div>
    </>
  );
}
export default BarPlot;
