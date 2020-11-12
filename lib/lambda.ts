/* eslint-disable import/first */
// this package is on dev dependency because we will use a lambda layer when deploying (see Readme)
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
import * as chromium from 'chrome-aws-lambda';
import { getSecret } from './getPassword';

export async function handler(_event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;

  const username = process.env.PGE_USERNAME;
  const password = await getSecret('/password/pge');

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  const url = 'https://www.pge.com/';

  await page.goto(url, { waitUntil: 'load', timeout: 180 * 1000 });

  // const content = await page.evaluate(() => {
  //   return document.body.innerHTML.substr(0, 1000);
  // });

  // console.log(content);

  await page.type('#username', username);
  await page.type('#password', password);

  await page.click('#home_login_submit');

  await page.waitForNavigation({
    waitUntil: 'networkidle0',
    timeout: 30 * 1000,
  });

  console.log('New Page URL:', page.url());

  await Promise.all([
    page.waitForSelector('.green-button', { timeout: 30 * 1000 }),
    page.click('#myusage'),
  ]);

  console.log('New Page URL:', page.url());

  // await page.click('#myusage');

  // await page.waitForNavigation();
  // await page.waitForSelector('.green-button', { timeout: 30 * 1000 });

  await Promise.all([page.waitForNavigation(), page.click('.green-button')]);

  await browser.close();
}
