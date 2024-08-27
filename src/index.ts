import { EmailService } from './EmailService';
import { MockEmailProvider } from './MockEmailProvider';

const provider1 = new MockEmailProvider('Provider1', 0.3); // 30% failure rate
const provider2 = new MockEmailProvider('Provider2', 0.2); // 20% failure rate

const emailService = new EmailService([provider1, provider2], 5);

async function main() {
  try {
    const status = await emailService.sendEmail('unique-id', 'recipient@example.com', 'Hello, World!');
    console.log('Email Status:', status);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

main();
