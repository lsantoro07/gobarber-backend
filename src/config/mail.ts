interface IMailConfig {
  driver: 'ethereal' | 'sendgrid' | 'smtp';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
