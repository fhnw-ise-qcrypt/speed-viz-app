import React, {useState, useRef} from 'react';
import * as d3 from 'd3';
import data from './handshakes_pretty.json';
import {useTransition, animated} from 'react-spring';

const sig=Object.entries(data)[0][0]
const sigs=Object.entries(data)

type dataEntry = [string, number];
type Props = {
}
type BarGroupProps = {
  boundedWidth: number, 
  boundedHeight: number
}

type BarProps = {
  xOffset: number,
  width: number,
  height: number,
  xLabel: string,
  yLabel: number,
  y: number,
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

  const BarGroup: React.FC<BarGroupProps> = ({boundedHeight, boundedWidth}) =>{
    const transitionRef = useRef();
    //@ts-ignore
    const transition = useTransition(
      //@ts-ignore
      entriesAsList.map(d=>({height: yScale(yAccessor(d as dataEntry)), y: boundedHeight-yScale(yAccessor(d as dataEntry))})),
      //@ts-ignore
      (entry, index) => index,
      {
        unique: true,
        //@ts-ignore
        from: ({height, y})=>({height, y}),
        //@ts-ignore
        //@ts-ignore
        enter: ({height, y})=>({height, y}),
        //@ts-ignore
        update: ({height, y})=>({height, y}),
        ref: transitionRef
      }
    )
    //@ts-ignore
    return transition.map(({item, props, key}, index)=>
      <>
        <animated.rect key={key} style={{...props, fill: "red"}} x={index*40} width={20} rx={5}></animated.rect>
      </>
    )
  }

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
            <BarGroup boundedWidth={boundedWidth} boundedHeight={boundedHeight}></BarGroup>
          </g>
        </svg>
      </div>
    </>
  );
}
export default Plot;
