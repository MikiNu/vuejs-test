const separation = (value) => {
  let parts = String(value).replace(',', '.').split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (parts[0] && parts[1]) {
    parts[1] = parts[1].substr(0, 2);
  } else if (!parts[0] && parts[1]) {
    parts = [parts[1].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')];
  }
  return parts.join('.');
};

export default {
  separation,
};
