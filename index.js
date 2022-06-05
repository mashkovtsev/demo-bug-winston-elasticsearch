const { createLogger } = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const esTransport = new ElasticsearchTransport({
  clientOpts: { node: 'http://localhost:9200' },
  retryLimit: 3, // By increasing this parameter, we will get more duplicates.
});

const logger = createLogger({
  transports: [esTransport],
});

logger.on('error', ({ name, message, }) => {
  console.error('Winston error', { name, message });
});

logger.info('correct'); // the message type now dynamically defined as text in ES
logger.info({ wrong: 'type' }); // Intentionally make an error here. Error from ES: "mapper_parsing_exception"
logger.info('Oh, no, duplicated 4 times with the same @timestamp ☹️'); // 3(retryLimit) + 1 = 4 times

setTimeout(() => {
  logger.info("Hmm, also duplicated 4 times ☹️");
}, 50)

setTimeout(() => {
  logger.info("Ok, not duplicated anymore");
}, 1000)
