import db from "../db/index.js";
import { CreateShortenedUrlDto } from "../dtos/create-shortened-url.dto.js";

/**
 *
 * @param {JSON} req_body
 * @returns {original_url: string, shortened_url: string}
 */
export async function generateShortenedUrl(req_body) {
  const base_url = process.env.BASE_URL;
  if (!base_url) {
    throw new Error("No base_url provided in config");
  }
  const { url } = CreateShortenedUrlDto.parse(req_body);

  // Generate a new shortenedURL
  const shortenedUrl = `${base_url}/${Math.random().toString(36).slice(2)}`;

  // If the shortened URL is already in use, generate a new one
  const [doesShortUrlExists] = await db("urls")
    .select("id")
    .where("shortened_url", shortenedUrl);

  if (!doesShortUrlExists) {
    let original_url = url;

    // If the original url does not have https://, append it
    if (!/^https?:\/\//i.test(original_url)) {
      original_url = "https://" + original_url;
    }
    await db("urls").insert({
      original_url,
      shortened_url: shortenedUrl,
    });

    return { original_url, shortened_url: shortenedUrl };
  } else {
    return generateShortenedUrl(req_body);
  }
}
