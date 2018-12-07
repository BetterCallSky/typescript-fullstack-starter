import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from 'config';
import { welcome } from '../email-templates/welcome';
import { resetPassword } from '../email-templates/resetPassword';
import { createContract } from 'defensive';
import { serviceName } from '../common/serviceName';
import { SendEmailSchema } from '../schemas';

function _getTransporter() {
  return nodemailer.createTransport(
    smtpTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD,
      },
    })
  );
}

export const sendMail = createContract(serviceName('sendMail'))
  .params('to', 'data')
  .schema(SendEmailSchema)
  .fn(async (to, data) => {
    const transporter = _getTransporter();
    const convert = () => {
      switch (data.type) {
        case 'resetPassword':
          return resetPassword(data.props);
        case 'welcome':
          return welcome(data.props);
      }
    };
    const { title, body } = convert();
    await transporter.sendMail({
      from: config.EMAIL_SENDER_ADDRESS,
      to,
      subject: title,
      html: body,
    });
  })
  .amqp({
    prefetch: 10,
    nackDelay: '10s',
    type: 'sendMail',
    async handler(msg) {
      await sendMail(msg.to, msg.data);
    },
  });
