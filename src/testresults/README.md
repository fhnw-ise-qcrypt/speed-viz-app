# Visualize your own testresults
## Run the tests
Run [oqs-speed](https://github.com/open-quantum-safe/speed/tree/main/perf/scripts) handshakes.py
Run [pq-tls-benchmark emulation-exp](https://github.com/xvzcf/pq-tls-benchmark/tree/master/emulation-exp/code/kex) experiment.py
## Moving files
Put all the results (`.csv` files and `handshakes.json` file) into this directory.

## Generating JSON files from .csv
run `node convert.js`\
This will read all the `.csv` Files, extract **median** and **95 percentile** values, sort the data by round trip time, and store it in 4 different `.json` Files.

## Restart
For the app to display the newly added data, you either have to
- build a new docker image or
- stop and rerun `npm start` from within project root directory
