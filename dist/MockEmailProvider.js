"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEmailProvider = void 0;
class MockEmailProvider {
    constructor(providerName, failRate) {
        this.providerName = providerName;
        this.failRate = failRate;
    }
    async sendEmail(recipient, content) {
        console.log(`Attempt to send email with provider ${this.providerName}`);
        return Math.random() > this.failRate;
    }
}
exports.MockEmailProvider = MockEmailProvider;
