import { inject, injectable } from 'tsyringe';
import sgMail from '@sendgrid/mail';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SendgridMailProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));
  }

  public async sendMail({
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const msg = {
      to,
      from: {
        name: 'Equipe GoBarber',
        email: 'gobarber@ls7.dev',
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    };
    sgMail.send(msg).catch(error => {
      console.log(error.response.body);
    });
  }
}
