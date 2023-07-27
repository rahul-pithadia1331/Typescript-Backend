import nodemailer from 'nodemailer';
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import dotenv from 'dotenv';
import { Options } from 'nodemailer/lib/mailer';

dotenv.config();

let transporter: nodemailer.Transporter;


transporter = nodemailer.createTransport(JSON.parse(JSON.stringify({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    auth: {
        user: process.env.SMTP_USERNAME || 'example@gmail.com', // SMTP email
        pass: process.env.SMTP_PASSWORD || 'example@123', // Your password
    },
    tls: {
        rejectUnauthorized: false,
    },
})));

const services = {
    send: async  function (
        templateName: string,
        data: any,
        mailOption: { from: string; to: string; subject: string, html?:string }
    ) {
        const emailTemplatePath = path.join(
            __dirname,
            'dir',
            'email_templates'
        );
        const template = fs.readFileSync(
            emailTemplatePath + '/' + templateName,
            {
                encoding: 'utf-8',
            }
        );
        const emailBody = ejs.render(template, data);
        console.log(emailBody);
        mailOption.html = emailBody;
        return await transporter.sendMail(mailOption) 
    },

    sendMail: function (mailOption: Options) {
        return transporter.sendMail(mailOption);
    },
};

export default services;
