import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { Logging } from '../config/Logging';
dotenv.config();

class MailService {
    transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ? process.env.SMTP_HOST : '',
            port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationMail(to: string, link: string) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: `Account activation at ${process.env.API_URL}`,
                text: '',
                html: `
                    <div>
                        <h1>To activate your account, please visit the link below.</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            });
            Logging.info(`Sending email to ${to}`, 'Email sent successfully.');
        } catch (error) {
            Logging.error(`Sending email to ${to}`, error);
        }
    }
}

export default MailService;
