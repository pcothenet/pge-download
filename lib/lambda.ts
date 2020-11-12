/* eslint-disable import/first */
require('dotenv').config();

import downloadZip from './downloadZip';
import getCookie from './getCookie';
import unZip from './unZip';

export async function handler(_event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;

  const cookie = await getCookie();

  console.log(cookie);

  const zipFileName = await downloadZip(cookie);

  console.log(zipFileName);

  await unZip(zipFileName);
}
