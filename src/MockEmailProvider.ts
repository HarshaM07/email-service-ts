export class MockEmailProvider {
    private providerName: string;
    private failRate: number;
  
    constructor(providerName: string, failRate: number) {
      this.providerName = providerName;
      this.failRate = failRate;
    }
  
    public async sendEmail(recipient: string, content: string): Promise<boolean> {
      console.log(`Attempt to send email with provider ${this.providerName}`);
      return Math.random() > this.failRate;
    }
  }
  