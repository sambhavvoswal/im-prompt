import http from 'http';
import https from 'https';

/**
 * Pings the server's own /health endpoint every 14 minutes
 * to prevent the Render free tier from going to sleep (which happens after 15m).
 * @param {string} serverUrl - The fully qualified URL of the server (e.g. https://im-prompt-api.onrender.com)
 */
export const startServerPing = (serverUrl) => {
    // Ping every 14 minutes (14 * 60 * 1000 = 840000 ms)
    const PING_INTERVAL = 14 * 60 * 1000;

    // Use http or https based on the protocol
    const lib = serverUrl.startsWith('https') ? https : http;

    setInterval(() => {
        const pingUrl = `${serverUrl}/health`;

        lib.get(pingUrl, (res) => {
            if (res.statusCode === 200) {
                console.log(`[Self-Ping] Successfully kept server awake at ${new Date().toISOString()}`);
            } else {
                console.error(`[Self-Ping] Failed with status code: ${res.statusCode}`);
            }
        }).on('error', (err) => {
            console.error(`[Self-Ping] Error during ping: ${err.message}`);
        });

    }, PING_INTERVAL);
    
    console.log(`[Self-Ping] Initialized. Server will be pinged every 14 minutes at ${serverUrl}/health`);
};
