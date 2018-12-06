import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import config from 'config';
import { welcome } from '../email-templates/welcome';
import { resetPassword } from '../email-templates/resetPassword';
import { createContract } from 'defensive';
import { V } from 'veni';

const templates = {
  welcome,
  resetPassword,
};

type Templates = typeof templates;

type ExtractTemplateProps<T> = T extends (props: infer V) => any ? V : never;

const templateType = Object.keys(templates).map(x => x as keyof Templates);

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

type SendMail = <T extends keyof Templates>(
  to: string,
  type: T,
  values: ExtractTemplateProps<Templates[typeof type]>
) => Promise<void>;

export const sendMail: SendMail = createContract('sendMail')
  .params('to', 'type', 'values')
  .schema({
    to: V.string().email(),
    type: V.enum().literal(...templateType),
    values: V.object(),
  })
  .fn(async (to, type, values: any) => {
    const transporter = _getTransporter();
    const fn = templates[type] as (
      props: object
    ) => { title: string; body: string };
    const { title, body } = fn(values);
    await transporter.sendMail({
      from: config.EMAIL_SENDER_ADDRESS,
      to,
      subject: title,
      html: body,
    });
  });
