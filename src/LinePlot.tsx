import React from 'react';
import * as d3 from 'd3';

type DataPoint = {
  packetLoss: number,
  median: number,
  percent95: number
}

type Kex = {
  name: string,
  data: DataPoint[],
}

type Props = {
  title: string,
  xLabel: string,
  yLabel: string,
  data: any,
  xDomain: number[],
  yDomain: number[],
  xAccessor: (d:DataPoint)=>number,
  yAccessor: (d:DataPoint)=>number,
}

const LinePlot: React.FC<Props> = ({title, data, xLabel, yLabel, xDomain, yDomain, xAccessor, yAccessor}) =>{
  const width=700;
  const height=600;
  const marginLeft=100;
  const marginRight=20;
  const marginTop=80;
  const marginBottom=50;
  const boundedWidth=width-marginLeft-marginRight;
  const boundedHeight=height-marginTop-marginBottom;
  const colors = ["#6497b1", "#ececa3", "#b5e550", "#607c3c", "#ffbaba", "#ff5252", "#f00", "#a70000", "#005b96"]
  const dashes = ["0", "1", "2 6 2", "2 2 4 2 2", "6 6 6 6", "5 1 5 1", "2", "7", "8"]
  const getColor = (k:string) =>{
    switch(k){
      case "saber":
        return colors[8]
      case "firesaber":
        return colors[0]
      case "kyber512":
        return colors[2]
      case "kyber768":
        return colors[3]
      case "kyber1024":
        return colors[1]
      case "ntru_hps2048509":
        return colors[5]
      case "ntru_hps2048677":
        return colors[6]
      case "ntru_hps4096821":
        return colors[7]
      case "ntru_hrss701":
        return colors[4]
      default:
        return "#fff";
    }
  }

  const getDashes = (k:string) =>{
    switch(k){
      case "saber":
        return dashes[0]
      case "firesaber":
        return dashes[1]
      case "kyber512":
        return dashes[2]
      case "kyber768":
        return dashes[3]
      case "kyber1024":
        return dashes[4]
      case "ntru_hps2048509":
        return dashes[5]
      case "ntru_hps2048677":
        return dashes[6]
      case "ntru_hps4096821":
        return dashes[7]
      case "ntru_hrss701":
        return dashes[8]
      default:
        return "#fff";
    }
  }

  const getPointStyle = (k:string) =>{
    switch(k){
      case "saber":
        return "circle"
      case "firesaber":
        return "rect"
      case "kyber512":
        return "emptyCircle"
      case "kyber768":
        return "emptyRect"
      case "kyber1024":
        return "circle"
      case "ntru_hps2048509":
        return "rect"
      case "ntru_hps2048677":
        return "emptyCircle"
      case "ntru_hps4096821":
        return "emptyRect"
      case "ntru_hrss701":
        return "circle"
      default:
        return "circle"
    }
  }
  //@ts-ignore
  const xScale = d3.scaleLinear().domain(xDomain) //packetLoss goes from 0 to 20
    .range([0, boundedWidth])
  //@ts-ignore
  const yScale = d3.scaleLinear().domain(yDomain)
    .range([boundedHeight, 0])
    .nice()

  const xTicks = xScale.ticks().map(value=>({
    value,
    xOffset: xScale(value)
  }))

  const yTicks = yScale.ticks().map((value)=>({
    value,
    yOffset: yScale(value)
  }))
  //@ts-ignore
  return(
    <div className="plot">
      <svg style={{backgroundColor: "#000", borderRadius: "5px"}} width={width} height={height}>
        <text x={boundedWidth*0.5+marginLeft} y={0.5*marginTop} fill="white" fontSize={20} textAnchor={"middle"}>{title}</text>
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
          <g transform={`translate(${-marginLeft+30}, ${boundedHeight*0.5})`}>
            <text style={{transform:`rotate(-90deg)`}} textAnchor={"middle"} fontSize={15} fill="white">{yLabel}</text>
          </g>
          <g transform={`translate(${boundedWidth*0.5}, ${boundedHeight+marginBottom-10})`}>
            <text textAnchor={"middle"} fill="white" fontSize={15}>{xLabel}</text>
          </g>
          <g transform={`translate(0, ${boundedHeight})`}>
            <line x2={boundedWidth} stroke="white"/>
            {xTicks.map(({value, xOffset})=>(
              <g key={value} transform={`translate(${xOffset}, 0)`}>
                <line y2="6" stroke="white"/> 
                <text key={value} style={{fontSize: "15px", fill: "white", textAnchor:"middle", transform: "translateY(20px)"}}>{value}</text>
              </g>
            ))}
          </g>
          <g>
            <line y2={boundedHeight} stroke="white"/>
            {yTicks.map(({value, yOffset})=>(
              <g key={value} transform={`translate(0, ${yOffset})`}>
                <line x2="-6" stroke="white"/> 
                <text key={value} style={{fontSize: "15px", fill: "white", textAnchor:"end", transform: "translate(-10px,2px)"}}>{value}</text>
              </g>
            ))}
          </g>
          {data.map((kex:Kex, kexIndex:number)=>{
              //@ts-ignore
              const line = d3.line().x(d=>xScale(xAccessor(d))).y(d=>yScale(yAccessor(d)))
              //@ts-ignore
              const lineString = line(kex.data);
              const color = getColor(kex.name);
            return(
            <>
              <text y={kexIndex*20} x={15} fill={color}>{kex.name}</text>
                <path d={lineString} strokeWidth={2} strokeDasharray={getDashes(kex.name)} fill={"none"} stroke={color}/>
                {kex.data.map((dataPoint, dataPointIndex)=>{
                  const pointStyle = getPointStyle(kex.name)
                  switch(pointStyle){
                    case "circle":
                      return <circle r={3} fill={color} cx={xScale(xAccessor(dataPoint))} cy={yScale(yAccessor(dataPoint))}></circle>
                    case "rect":
                      return <rect transform={`translate(-2, -2)`} width={4} height={4} strokeWidth={1} fill={color} stroke={color} x={xScale(xAccessor(dataPoint))} y={yScale(yAccessor(dataPoint))}/>
                    case "emptyCircle":
                      return <circle r={3} strokeWidth={1} stroke={color} cx={xScale(xAccessor(dataPoint))} cy={yScale(yAccessor(dataPoint))}></circle>
                    case "emptyRect":
                      return <rect transform={`translate(-2, -2)`} width={4} height={4} strokeWidth={1} stroke={color} x={xScale(xAccessor(dataPoint))} y={yScale(yAccessor(dataPoint))}/>
                    default:
                      return <circle r={3} fill={color} cx={xScale(xAccessor(dataPoint))} cy={yScale(yAccessor(dataPoint))}></circle>

                  }
                    }
                    //<text x={xScale(xAccessor(dataPoint))} y={yScale(yAccessor(dataPoint))} fill={colors[kexIndex]} fontSize={"10px"} textAnchor={"middle"} style={{verticalAlign: "bottom"}}>*</text>
                )}
            </>
              )
            }
          )}
        </g>
      </svg>
    </div>
  )
}

export default LinePlot;
