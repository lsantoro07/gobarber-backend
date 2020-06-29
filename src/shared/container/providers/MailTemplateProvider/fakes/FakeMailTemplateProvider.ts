import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakemMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}

export default FakemMailTemplateProvider;
