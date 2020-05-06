const {
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  PORT,
  DEBUG,
  ONVEX,
  SECRET_KEY,
  SENDGRID_MAIL_FROM,
  SERVERNAME,
  EMAILPORT,
  TLS,
  SMTP_USERNAME,
  SMTP_PASSWORD,
} = process.env;

module.exports = {
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  PORT,
  SECRET_KEY,
  SENDGRID_MAIL_FROM,
  SERVERNAME,
  EMAILPORT,
  TLS,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  TOKEN_EXPIRATION: 3,
  DATE_FORMAT: 'MM-DD-YYYY', // refer to momentjs format, use on response
  DATE_FORMAT_PH: 'DD-MM-YYYY HH:MM A', // refer to momentjs format, use on response
  DATE_YEAR_MM_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'hh:mm A', // refer to momentjs format
  VALID_DATE_FORMAT: 'MM-DD-YYYY', // refer to momentjs format, use to validate request
  VALID_TIME_FORMAT: 'HH:mm', // refer to momentjs format, use to validate request
  DEBUG: JSON.parse(DEBUG),
  DEBUG_VERBOSE: true && JSON.parse(DEBUG),
  ONVEX: JSON.parse(ONVEX),
  MIN_AGE: 0,
  MAX_BUDDIES: 3,
  MIN_CONTACTS: 10,
  MAX_CONTACTS: 20,
  ADMINMAXRECORDCOUNT_MISCELLANEOUS: 7,
  ADMINMAXRECORDCOUNT: 20,
  CLIENTMAXRECORDCOUNT: 5,
  COUNTER: 1000,
  SUBJECTAPPROVE: 'Task Approval Notice',
  SUBJECTREJECT: 'Task Rejection Notice',
  TASKHISTORY: 10,
  MAXLENGTH_TEXT: 128,
};
