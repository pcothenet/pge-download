"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
/* eslint-disable import/first */
// this package is on dev dependency because we will use a lambda layer when deploying (see Readme)
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const chromium = require("chrome-aws-lambda");
const getPassword_1 = require("./getPassword");
function handler(_event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.callbackWaitsForEmptyEventLoop = false;
        const username = process.env.PGE_USERNAME;
        const password = yield getPassword_1.getSecret('/password/pge');
        const browser = yield chromium.puppeteer.launch({
            args: chromium.args,
            executablePath: yield chromium.executablePath,
            defaultViewport: chromium.defaultViewport,
            headless: chromium.headless,
        });
        const page = yield browser.newPage();
        const url = 'https://www.pge.com/';
        yield page.goto(url, { waitUntil: 'load', timeout: 180 * 1000 });
        // const content = await page.evaluate(() => {
        //   return document.body.innerHTML.substr(0, 1000);
        // });
        // console.log(content);
        yield page.type('#username', username);
        yield page.type('#password', password);
        yield page.click('#home_login_submit');
        yield page.waitForNavigation({
            waitUntil: 'networkidle0',
            timeout: 30 * 1000,
        });
        console.log('New Page URL:', page.url());
        yield Promise.all([
            page.waitForSelector('.green-button', { timeout: 30 * 1000 }),
            page.click('#myusage'),
        ]);
        console.log('New Page URL:', page.url());
        // await page.click('#myusage');
        // await page.waitForNavigation();
        // await page.waitForSelector('.green-button', { timeout: 30 * 1000 });
        yield Promise.all([page.waitForNavigation(), page.click('.green-button')]);
        yield browser.close();
    });
}
exports.handler = handler;
//# sourceMappingURL=lambda.js.map