"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecret = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const aws_sdk_1 = require("aws-sdk");
process.env.AWS_PROFILE = 'perso';
const ssmClient = new aws_sdk_1.SSM();
async function getSecret(secretName) {
    const params = { Names: [secretName], WithDecryption: true };
    const { Parameters: [{ Value: value }], } = await ssmClient.getParameters(params).promise();
    return value;
}
exports.getSecret = getSecret;
//# sourceMappingURL=getPassword.js.map