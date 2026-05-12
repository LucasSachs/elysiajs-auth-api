import { file, write } from 'bun';
import { generateKeyPairSync } from 'node:crypto';

/*
 * This architecture has a particular behavior when used with Docker:
 * new keys are generated every time the system is updated (because we rebuild Linux),
 * which causes all users to be logged out of the system as the key pair is updated.
 * This could be resolved by using some form of external storage for these keys,
 * such as AWS KMS, which would keep the keys static and independent of the system files.
 * Or we could use Docker Volumes to keep always the same keys between system updates.
 */

const publicKeyPath = `${import.meta.dir}/public.pem`;
const privateKeyPath = `${import.meta.dir}/private.pem`;

/*
 * This is executed every time we restart the server(which could be a problem when hot reloading),
 * but Bun are extremely fast reading files, so we don't need to worry about performance here.
 * I made some benchmarks, and this executes in less than 1ms.
 */
const [doesPublicKeyExists, doesPrivateKeyExists] = await Promise.all([file(publicKeyPath).exists(), file(privateKeyPath).exists()]);

if (!doesPublicKeyExists || !doesPrivateKeyExists) {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  await Promise.all([write(publicKeyPath, publicKey), write(privateKeyPath, privateKey)]);

  console.log(' > JWT: New key pair generated');
}
