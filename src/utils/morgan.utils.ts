import * as morgan from 'morgan';
import * as moment from 'moment-timezone';

morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
});
morgan.format(
  'customFormet',
  '[:date[Asia/Seoul]] ":method :url" :status :res[content-length] - :response-time ms',
);

export { morgan };
