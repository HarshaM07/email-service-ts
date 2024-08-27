export class RateLimiter {
    private tokens: number;
    private maxTokens: number;
    private refillRate: number;
  
    constructor(maxTokens: number, refillRate: number = 1) {
      this.tokens = maxTokens;
      this.maxTokens = maxTokens;
      this.refillRate = refillRate;
  
      setInterval(() => this.refillTokens(), 1000);
    }
  
    private refillTokens() {
      this.tokens = Math.min(this.tokens + this.refillRate, this.maxTokens);
    }
  
    public tryRemoveToken(): boolean {
      if (this.tokens > 0) {
        this.tokens--;
        return true;
      }
      return false;
    }
  }
  