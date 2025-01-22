import { FROM_EMAIL } from "src/constant";
import sgMail from "src/libs/sendgrid";

/**
 *
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise<void>}
 */

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<void> => {
  try {
    const msg = {
      to,
      // Set from email
      from: FROM_EMAIL,
      subject,
      text,
      html,
      // Add attachments if any
      attachments: [],
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    throw new Error("Error while sending email");
  }
};
