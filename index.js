import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import { generateShortenedUrl, redirectToUrl } from "./helpers/index.js";
import { errorHandler, requestHandler } from "./middleware/index.js";

// Initialize dotenv
dotenv.config();

// Initialize app
const app = express();

// Constants
const PORT = process.env.PORT || 8000;

// Middleware
if (process.env.NODE_ENV === "DEV") {
  app.use(morgan("combined"));
}
app.use(express.json());
app.use(express.static("client/build"));

// Endpoints
// app.get(
//   "/:shortenedUrl",
//   requestHandler(async (req, res) => {
//     const { shortenedUrl } = req.params;
//     res
//       .status(StatusCodes.TEMPORARY_REDIRECT)
//       .redirect(await redirectToUrl(shortenedUrl));
//   })
// );

app.get("/:shortenedUrl", async (req, res) => {
  try {
    const { shortenedUrl } = req.params;
    res
      .status(StatusCodes.PERMANENT_REDIRECT)
      .redirect(await redirectToUrl(shortenedUrl));
  } catch (error) {
    res.redirect("/?error=404");
  }
});

app.post(
  "/",
  requestHandler(async (req, res) => {
    res.status(StatusCodes.CREATED).json(await generateShortenedUrl(req.body));
  })
);

app.get(
  "*",
  requestHandler(async (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running on port ${PORT}`);
});
