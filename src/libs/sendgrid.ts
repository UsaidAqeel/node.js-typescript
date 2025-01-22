import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY } from "src/constant";

// Set the API key 
sgMail.setApiKey(SENDGRID_API_KEY);

export default sgMail;