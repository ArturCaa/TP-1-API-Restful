import winston from 'winston';
import path from 'path';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname, '../logs/info.log'), level: 'info' }),
    new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
  ],
});

logger.info('L\'application a démarré');


export default logger;