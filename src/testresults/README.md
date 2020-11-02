# Generating the JSON Files
Run [pq-tls-benchmark emulation-exp](https://github.com/xvzcf/pq-tls-benchmark/tree/master/emulation-exp/code/kex) kex tests.\
Put all the resulting `.csv` files into this directory and run\
`node convert.js`\
This will read all the `.csv` Files, extract **median** and **95 percentile** values, sort the data by round trip time, and store it in 4 different `.json` Files.
