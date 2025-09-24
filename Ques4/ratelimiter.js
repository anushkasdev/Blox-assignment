class RateLimiter {
    constructor(maxCalls, perSeconds) {
        this.maxCalls = maxCalls;
        this.perSeconds = perSeconds * 1000;
        this.callTimes = [];
    }

    async callAPI(input) {
        const now = Date.now();

        this.callTimes = this.callTimes.filter(t => now - t < this.perSeconds);

        if (this.callTimes.length >= this.maxCalls) {
            const waitTime = this.perSeconds - (now - this.callTimes[0]);
            console.log(`Rate limit reached. Waiting ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        this.callTimes.push(Date.now());
        console.log(`API Response for: ${input}`);
    }
}

// Sample input
(async () => {
    const apiLimiter = new RateLimiter(15, 60); 

    for (let i = 1; i <= 20; i++) {
        await apiLimiter.callAPI(`request_${i}`);
    }
})();
