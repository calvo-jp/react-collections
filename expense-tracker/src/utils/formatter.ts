const formatter = {
  currency: new Intl.NumberFormat(),
  dateTime: new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }),
};

export default formatter;
