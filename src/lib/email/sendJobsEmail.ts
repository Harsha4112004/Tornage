import nodemailer from "nodemailer";

export async function sendJobsEmail(
  html: string,
  jobCount: number,
  recipients: string[],
) {
    
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
 
  await transport.sendMail({
    from: `"Tornage" <${process.env.SMTP_USER}>`,
    bcc: recipients,
    subject: `🇮🇳 Fresher / Internship Jobs – ${jobCount} new`,
    html,
  });
}
