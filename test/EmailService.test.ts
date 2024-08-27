import { EmailService } from '../src/EmailService';
import { MockEmailProvider } from '../src/MockEmailProvider';

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => {
    const provider1 = new MockEmailProvider('Provider1', 0.5);
    const provider2 = new MockEmailProvider('Provider2', 0.5);
    emailService = new EmailService([provider1, provider2], 5);
  });

  test('should send email successfully', async () => {
    const status = await emailService.sendEmail('test-id', 'recipient@example.com', 'Hello, World!');
    expect(status.status).toBe('sent');
    expect(status.attempts).toBeGreaterThan(0);
  }, 10000); // Increase timeout for this test

  test('should handle rate limiting', async () => {
    for (let i = 0; i < 5; i++) {
      await emailService.sendEmail(`test-id-${i}`, 'recipient@example.com', 'Hello, World!');
    }
  }, 10000); // Increase timeout for this test
});
