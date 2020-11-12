"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
/* eslint-disable import/first */
require('dotenv').config();
const downloadZip_1 = require("./downloadZip");
const getCookie_1 = require("./getCookie");
const unZip_1 = require("./unZip");
async function handler(_event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const cookie = await getCookie_1.default();
    console.log(cookie);
    const zipFileName = await downloadZip_1.default(cookie);
    console.log(zipFileName);
    await unZip_1.default(zipFileName);
}
exports.handler = handler;
//# sourceMappingURL=lambda.js.map