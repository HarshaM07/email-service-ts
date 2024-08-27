"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class RateLimiter {
    constructor(maxTokens, refillRate = 1) {
        this.tokens = maxTokens;
        this.maxTokens = maxTokens;
        this.refillRate = refillRate;
        setInterval(() => this.refillTokens(), 1000);
    }
    refillTokens() {
        this.tokens = Math.min(this.tokens + this.refillRate, this.maxTokens);
    }
    tryRemoveToken() {
        if (this.tokens > 0) {
            this.tokens--;
            return true;
        }
        return false;
    }
}
exports.RateLimiter = RateLimiter;
