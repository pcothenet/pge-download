// this package is on dev dependency because we will use a lambda layer when deploying (see Readme)
// eslint-disable-next-line import/no-extraneous-dependencies
import * as chromium from 'chrome-aws-lambda';
import { getSecret } from './getPassword';

export default async function getCookie() {
  const username = process.env.PGE_USERNAME;
  const password = await getSecret('/password/pge');

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    // headless: true,
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

  //   await page.click('#home_login_submit');

  //   await page.waitForNavigation({
  //     waitUntil: 'networkidle0',
  //     timeout: 30 * 1000,
  //   });

  await Promise.all([
    page.waitForSelector('#myusage', { timeout: 30 * 1000 }),
    page.click('#home_login_submit'),
  ]);

  const cookies = await page.cookies();

  const cookie = cookies.reduce((acc: string, cur: any) => {
    return `${acc}${cur.name}=${cur.value}; `;
  }, '');

  await browser.close();
  return cookie;
  //   console.log(await page.cookies());

  //   console.log('New Page URL:', page.url());

  //   await Promise.all([
  //     page.waitForSelector('.green-button', { timeout: 30 * 1000 }),
  //     page.click('#myusage'),
  //   ]);

  //   console.log('New Page URL:', page.url());

  // the code below executes a function inside the browser
  // const result = await page.evaluate(async (downloadUrl) => {
  //   // this section is executed inside the browser
  //   const response = await fetch(downloadUrl, {
  //     method: 'GET',
  //     credentials: 'include',
  //   });
  //   const text = await response.text();
  //   return text;
  // }, usageUrl);
}
