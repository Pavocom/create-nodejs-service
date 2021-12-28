import moment from 'moment';

export default function isValidDate(date, { format = 'YYYY-MM-DDTHH:mm:ssZ' }) {
  return !!moment(date, format, true).isValid();
}
