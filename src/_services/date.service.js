import { DateTime } from 'luxon'

export class DateService {
  static format (date = DateTime.local().toISO(), format = 'DATETIME_FULL') {
    return DateTime.fromISO(date).toLocaleString(DateTime[format])
  }

  static toISODate (date = DateTime.local().toISO()) {
    return DateTime.fromISO(date).toISODate()
  }

  static compareDates (d1, d2) {
    return DateTime.fromISO(d1) > DateTime.fromISO(d2)
  }
}
