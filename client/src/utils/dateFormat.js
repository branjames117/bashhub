const addDateSuffix = (date) => {
  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

class DateFormatter {
  // function to format a timestamp, accepts the timestamp and an `options` object as parameters
  dateFormat(timestamp, { monthLength = 'short', dateSuffix = true } = {}) {
    if (!timestamp) {
      return null;
    }

    // create month object
    const months = {
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: monthLength === 'short' ? 'May' : 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };

    // coerce timestamp into a number by subtracting 0
    const dateObj = new Date(timestamp - 0);
    const formattedMonth = months[dateObj.getMonth()];

    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();

    const year = dateObj.getFullYear();
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() / 2)
        : dateObj.getHours();

    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }

    const minutes = dateObj.getMinutes();

    // set `am` or `pm`
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${
      minutes < 10 ? '0' + minutes : minutes
    } ${periodOfDay}`;

    return formattedTimeStamp;
  }

  // extract DATE only from a timestamp
  getDate(timestamp, { monthLength = 'short', dateSuffix = true } = {}) {
    if (!timestamp) {
      return null;
    }
    // create month object
    const months = {
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: monthLength === 'short' ? 'May' : 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };

    // coerce timestamp into a number by subtracting 0
    const dateObj = new Date(timestamp - 0);
    const formattedMonth = months[dateObj.getMonth()];

    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();

    const year = dateObj.getFullYear();

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year}`;

    return formattedTimeStamp;
  }

  // extract TIME only from a timestamp
  getTime(timestamp, { monthLength = 'short', dateSuffix = true } = {}) {
    if (!timestamp) {
      return null;
    }

    // coerce timestamp into a number by subtracting 0
    const dateObj = new Date(timestamp - 0);

    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() / 2)
        : dateObj.getHours();

    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }

    const minutes = dateObj.getMinutes();

    // set `am` or `pm`
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

    const formattedTimeStamp = `${hour}:${
      minutes < 10 ? '0' + minutes : minutes
    } ${periodOfDay}`;

    return formattedTimeStamp;
  }

  sortSubevents(input) {
    // get ready for the least efficient sorting algorithm you've ever seen

    // find out how many unique dates there are among subevents and create a set containing each unique date
    const [...subevents] = input;
    const dates = new Set();

    // find out how many unique dates there are among the subevents
    subevents.forEach((e) =>
      dates.add(new Date(e.startDate - 0).toString().slice(0, 15))
    );

    const datesArr = [...dates];

    const dailyPlan = [];

    datesArr.forEach((date) => {
      dailyPlan.push({ date, subevents: [] });
    });

    subevents.forEach((subevent) => {
      const date = new Date(subevent.startDate - 0).toString().slice(0, 15);
      const index = dailyPlan.findIndex((dateObj) => {
        return dateObj.date === date;
      });

      dailyPlan[index].subevents.push(subevent);
    });

    return dailyPlan;
  }
}

export default new DateFormatter();
