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
exports.getSecret = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const aws_sdk_1 = require("aws-sdk");
process.env.AWS_PROFILE = 'perso';
const ssmClient = new aws_sdk_1.SSM();
function getSecret(secretName) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = { Names: [secretName], WithDecryption: true };
        const { Parameters: [{ Value: value }], } = yield ssmClient.getParameters(params).promise();
        return value;
    });
}
exports.getSecret = getSecret;
//# sourceMappingURL=getPassword.js.map