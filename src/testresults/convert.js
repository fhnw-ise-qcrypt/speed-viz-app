const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile)
const roundTripTimes = ["5", "31", "78", "195"];

fs.readdir('./', (err, data)=>{
  if(err){
    throw err
  }
  else{
    //we only want the .csv files
    const csvFileNames = data.filter(fileName=>fileName.match(".csv"))

    roundTripTimes.map(async (rtt) => {
      const fileNamesFilteredByRTT = csvFileNames.filter(fileName=>fileName.match(`_${rtt}p`))
      const data = await Promise.all(fileNamesFilteredByRTT
        .map(async (fileName, index) => createObjectFromCSVFile(`./${fileName}`, index)))
      fs.writeFileSync(`${rtt}_ms.json`, JSON.stringify(data, null, 4))
    })
  }
})

const createObjectFromCSVFile = async (pathString, index) => {
  const data = await readFile(pathString, 'utf8')
  const reducedData = data
      .split(/\r?\n/)// split file by lines
      .map(line => line.split(','))// split line by comma
      .map(values => values.map(d=>Number(d)))// convert values to number
      .map(values => 
        ({
          packetLoss: values.slice()[0], 
          median: median(values.slice(1)),
          percent95: percentile95(values.slice(1))
        })
      )// only take the delay time at index 0 and the median of all the values
  return {
    name: pathString.split(/_\d*p\d*ms.csv/)[0].split('/')[1],// only keep the kex-name
    index: index,
    data: reducedData.slice(0, reducedData.length-1), //remove the last entry which is undefined
  }
}


//const dataJSON=JSON.stringify(dataParsed, null, 4)
//fs.writeFileSync('speed_kem_pretty.json',dataJSON)

const median = (arrayOfNumbers) => {
  const sum = arrayOfNumbers.reduce((p, c)=>p+c, 0)
  return sum/arrayOfNumbers.length;
};

const percentile95 = (arrayOfNumbers) => {
  const ordinalRank = Math.ceil(0.95*arrayOfNumbers.length);
  const sorted = arrayOfNumbers.sort((a,b)=>a-b);
  return sorted[ordinalRank]
}

//createObjectFromCSVFile('./kyber512_5p560ms.csv');
