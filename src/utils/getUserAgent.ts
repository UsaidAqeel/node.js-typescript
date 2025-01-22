import { Request } from "express";
import userAgent from "express-useragent";
import { UserAgentInfo } from "src/types/userAgent";

/**
 * Get the user-agent and browser details.
 *
 * @param {Request} req
 * @returns {UserAgentInfo | null} get user-agent information or null.
 */

export const getUserAgent = (req: Request): UserAgentInfo | null => {
  try {
    const userAgentHeader = req.headers["user-agent"];
    if (!userAgentHeader) return null;

    const agent = userAgent.parse(userAgentHeader);
    return {
      browser: agent.browser || "Unknown",
      version: agent.version || "Unknown",
      os: agent.os || "Unknown",
      platform: agent.platform || "Unknown",
      source: agent.source || "Unknown",
      device: {
        isDesktop: agent.isDesktop || false,
        isMobile: agent.isMobile || false,
        isTablet: agent.isTablet || false,
      },
    };
  } catch (err) {
    console.error("Error getting user-agent:", err);
    return null;
  }
};
