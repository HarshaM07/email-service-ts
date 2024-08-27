import { MockEmailProvider } from './MockEmailProvider';
import { RateLimiter } from './RateLimiter';

interface EmailStatus {
  id: string;
  status: 'sent' | 'failed';
  attempts: number;
  lastAttempt: Date;
}

export class EmailService {
  private providers: MockEmailProvider[];
  private rateLimiter: RateLimiter;
  private sentEmails: Set<string>;

  constructor(providers: MockEmailProvider[], rateLimit: number) {
    this.providers = providers;
    this.rateLimiter = new RateLimiter(rateLimit);
    this.sentEmails = new Set<string>();
  }

  private async retryWithExponentialBackoff(func: () => Promise<boolean>, retries: number): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      if (await func()) {
        return true;
      }
      const backoffTime = Math.pow(2, i) * 1000;
      await this.delay(backoffTime);
    }
    return false;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async sendEmail(id: string, recipient: string, content: string): Promise<EmailStatus> {
    if (this.sentEmails.has(id)) {
      throw new Error('Email already sent.');
    }

    if (!this.rateLimiter.tryRemoveToken()) {
      throw new Error('Rate limit exceeded.');
    }

    let attempts = 0;
    for (const provider of this.providers) {
      attempts++;
      const sent = await this.retryWithExponentialBackoff(() => provider.sendEmail(recipient, content), 3);
      if (sent) {
        this.sentEmails.add(id);
        return {
          id,
          status: 'sent',
          attempts,
          lastAttempt: new Date(),
        };
      }
    }

    return {
      id,
      status: 'failed',
      attempts,
      lastAttempt: new Date(),
    };
  }
}
