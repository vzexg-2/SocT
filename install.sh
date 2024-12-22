echo "
Dependencies install, make sure you installed nodejs and npm.
"
npm install cloudscraper -y && npm install http -y && npm install https -y && npm install net -y && npm install puppeteer -y
ulimit -u 1100000
clear && echo "[!] If failed, type (sudo su)"
clear; node SocT.js
