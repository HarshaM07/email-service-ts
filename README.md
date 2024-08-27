# Email Service

A resilient email sending service with retry logic, fallback between providers, idempotency, rate limiting, and status tracking.

## Features

- **Retry Mechanism:** Retries sending an email with exponential backoff.
- **Fallback Between Providers:** Switches to another provider if the first fails.
- **Idempotency:** Prevents duplicate email sends.
- **Rate Limiting:** Limits the number of emails sent per second.
- **Status Tracking:** Tracks email sending attempts and status.

## Setup

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
