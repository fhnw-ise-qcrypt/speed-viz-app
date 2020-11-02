# Visualization of KEX- and SIG-Algorithm performance
This app visualizes results from the following performance tests:
- [oqs-speed](https://github.com/open-quantum-safe/speed/tree/main/perf/scripts) handshakes.py
- [pq-tls-benchmark emulation-exp](https://github.com/xvzcf/pq-tls-benchmark/tree/master/emulation-exp/code/kex) experiment.py

The tests were run on a computer with the following specs:\
**iMac**: (mid 2010)\
**Processor**: 2.8 GHz Intel Core i5\
**Memory**: 16 GB 1333 MHz DDR3\

## Run with docker
#### Clone the repository
 `git clone https://github.com/frankimhof/speed-viz-app.git`\
 `cd viz-speed-app`
#### Build the docker image
 `docker build -t viz-speed-app .`
#### Run the container
 `docker run -p 80:80 viz-speed-app`
#### Open the browser and visit
 `localhost:80`

## Run with node
#### Clone the repository
`git clone https://github.com/frankimhof/speed-viz-app.git`\
`cd viz-speed-app`
#### Install dependencies
`npm install`
#### Run
`npm start`\
This will start the app on `localhost:3000`

## Visualize your own testresults
To visualize your own testresults, see [here](https://github.com/frankimhof/speed-viz-app/blob/main/src/testresults/README.md) for instructions on how to prepare the data.
</br>
</br>
</br>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
