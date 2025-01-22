import { Request } from "express";
import requestIp from "request-ip";

/**
 * Retrieves the client's IP address from an HTTP request.
 *
 * @param {Request} req
 * @returns {string} The client's IP address as a string, or an empty string if not found.
 */
export const getIpAddress = (req: Request): string => {
  try {
    const clientIpAddress = requestIp.getClientIp(req);

    const forwardedIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Convert forwardedIp to a string if it's an array
    const forwardedIpString = Array.isArray(forwardedIp) ? forwardedIp.join(",") : forwardedIp;

    return clientIpAddress || forwardedIpString || "";
  } catch (error) {
    console.error("Error retrieving IP address:", error);
    return "Unknown";
  }
};
