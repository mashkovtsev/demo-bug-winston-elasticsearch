# Demo winston-elasticsearch bug

## Required versions

- node.js: 12.*
- elasticsearch: 7.17.4
- winston-elasticsearch: 0.16.1

## Run commands

```shell
docker run --rm -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.17.4
# Wait for ES to start...

yarn start
# Wait end of script...
```

And go to http://localhost:9200/_search?pretty to see the duplicates
