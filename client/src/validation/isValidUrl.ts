export const isValidUrl = (url: string) => {
  const URL_REGEX =
    /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?((\/)?([a-zA-Z0-9\-.]+)?)+$/g;

  if (url.match(URL_REGEX)) {
    return true;
  }

  return false;
};
