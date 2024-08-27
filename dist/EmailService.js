"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const RateLimiter_1 = require("./RateLimiter");
class EmailService {
    constructor(providers, rateLimit) {
        this.providers = providers;
        this.rateLimiter = new RateLimiter_1.RateLimiter(rateLimit);
        this.sentEmails = new Set();
    }
    async retryWithExponentialBackoff(func, retries) {
        for (let i = 0; i < retries; i++) {
            if (await func()) {
                return true;
            }
            const backoffTime = Math.pow(2, i) * 1000;
            await this.delay(backoffTime);
        }
        return false;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async sendEmail(id, recipient, content) {
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
exports.EmailService = EmailService;
