import { DateTime } from 'luxon';

const formationDate = (date) => (DateTime.fromISO(date).diffNow().isValid ? DateTime.fromISO(date).toFormat('dd.LL.yyyy') : 'неверная дата');

export default {
  formationDate,
};
