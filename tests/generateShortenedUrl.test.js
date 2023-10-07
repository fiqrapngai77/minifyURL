import { generateShortenedUrl } from "../helpers";
import { z, ZodError } from "zod";

const URL_REGEX =
  /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?((\/)?([a-zA-Z0-9\-.]+)?)+$/g;

test("Generate a new URL", async () => {
  expect.assertions(1);
  process.env.BASE_URL = "http://minifyurl.com";
  const data = await generateShortenedUrl({ url: "https://www.wwe.com" });

  return expect(data).toMatchObject({
    original_url: expect.stringMatching(URL_REGEX),
    shortened_url: expect.stringMatching(URL_REGEX),
  });
});
