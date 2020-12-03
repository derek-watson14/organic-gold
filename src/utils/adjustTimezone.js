const adjustTimezone = (date, hoursToAdjust = 9) => {
  const hourInMs = 3600000;
  const msAdjustment = hourInMs * hoursToAdjust;
  return new Date(date).valueOf() + msAdjustment;
};

export default adjustTimezone;
