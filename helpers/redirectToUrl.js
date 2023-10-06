import db from "../db/index.js";

/**
 *
 * @param {string} shortened_url
 * @returns string original_url
 */
export async function redirectToUrl(shortened_url) {
  const base_url = process.env.BASE_URL;
  if (!base_url) {
    throw new Error("No base_url provided in config");
  }

  //   Check if any records of this shortened URL exists
  const [row] = await db("urls")
    .select("original_url")
    .where("shortened_url", `${base_url}/${shortened_url}`);

  if (row) {
    return row.original_url;
  } else {
    throw new Error("No URLs found, please create a new shortened URL");
  }
}
