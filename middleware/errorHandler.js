/* eslint-disable no-unused-vars */

import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

// @ts-check

/**
 * Catches all thrown errors in the application and return response
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const errorHandler = async (err, req, res, next) => {
  const error = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    data: {},
    ...err,
  };

  error.message = err.message;

  /** Handles validation errors throw by Zod */
  if (err instanceof ZodError) {
    error.message = err.issues;
    error.statusCode = StatusCodes.BAD_REQUEST;
  }

  /** Handles sql errors */
  if ("sqlMessage" in err) {
    error.message = err.sqlMessage;
  }

  /** Handles errors with data */
  if (err.data) {
    error.data = err.data;
  }

  /** Logs error to server console */
  console.log(err);

  res.status(error.statusCode).json({
    error: error.message || "Server Error",
    data: error.data || {},
  });
};
