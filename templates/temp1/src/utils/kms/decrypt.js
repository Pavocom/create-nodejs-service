

import fs from 'fs';
import kms from '@google-cloud/kms';
import { promisify } from 'util';
import path from 'path';

async function decrypt(
  projectId = 'ztar-web-platform',
  keyRingId = 'test',
  cryptoKeyId = 'zwp-bff',
  ciphertextFileName = './env.encrypted',
  plaintextFileName = '../../../.env',
) {
  try {
    const client = new kms.KeyManagementServiceClient();
    const locationId = 'global';
    // Reads the file to be decrypted
    const readFile = promisify(fs.readFile);
    const contentsBuffer = await readFile(path.resolve(__dirname, ciphertextFileName));
    const name = client.cryptoKeyPath(
      projectId,
      locationId,
      keyRingId,
      cryptoKeyId,
    );
    const ciphertext = contentsBuffer.toString('base64');

    // Decrypts the file using the specified crypto key
    const [result] = await client.decrypt({ name, ciphertext });

    // Writes the decrypted file to disk
    const writeFile = promisify(fs.writeFile);
    await writeFile(path.resolve(__dirname, plaintextFileName), Buffer.from(result.plaintext, 'base64'));
    logger.info(`Decrypted ${ciphertextFileName}, result saved to ${plaintextFileName}.`);
  } catch (error) {
    throw error;
  }
}

decrypt();
