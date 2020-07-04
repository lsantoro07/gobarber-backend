import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SendgridMailProvider from './implementations/SendgridMailProvider';
import IMailProvider from './models/IMailProvider';
import SMTPMailProvider from './implementations/SMTPMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  sendgrid: container.resolve(SendgridMailProvider),
  smtp: container.resolve(SMTPMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
