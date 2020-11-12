import * as request from 'superagent';
import * as fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as chromium from 'chrome-aws-lambda';

const usageUrl =
  'https://pge.opower.com/ei/edge/apis/DataBrowser-v1/cws/utilities/pge/customers/f8216c7a-9116-11e9-94c1-3a33ce7fc8fb/usage_export/download?format=csv&startDate=2020-10-11&endDate=2020-11-11';

export default async function downloadZip(cookie: string) {
  const root = chromium.headless ? '/tmp' : './tmp';
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }
  const dir = `${root}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const fileName = `${dir}/data.zip`;

  const writeStream = fs.createWriteStream(fileName);
  const readStream = request.get(usageUrl).set('Cookie', cookie);

  await new Promise((resolve, reject) => {
    readStream.pipe(writeStream).on('end', resolve).on('error', reject);
  });
  console.log(`wrote to ${fileName}`);

  return fileName;
}
