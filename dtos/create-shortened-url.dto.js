import { z } from "zod";

const URL_REGEX =
  /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?((\/)?([a-zA-Z0-9\-.]+)?)+$/g;

export const CreateShortenedUrlDto = z
  .object({
    url: z.string().regex(new RegExp(URL_REGEX)),
  })
  .strict();
