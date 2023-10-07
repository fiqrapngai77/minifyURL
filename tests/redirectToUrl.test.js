import { redirectToUrl } from "../helpers";

const URL_REGEX =
  /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?((\/)?([a-zA-Z0-9\-.]+)?)+$/g;

test("Invalid URL", async () => {
  expect.assertions(1);
  return expect(
    redirectToUrl("http://localhost:8000/invalidURL")
  ).rejects.toEqual(
    new Error("No URLs found, please create a new shortened URL")
  );
});
