// eslint-disable-next-line import/no-extraneous-dependencies
import { SSM } from 'aws-sdk';

process.env.AWS_PROFILE = 'perso';

const ssmClient = new SSM();

export async function getSecret(secretName: string) {
  const params = { Names: [secretName], WithDecryption: true };
  const {
    Parameters: [{ Value: value }],
  } = await ssmClient.getParameters(params).promise();
  return value;
}
