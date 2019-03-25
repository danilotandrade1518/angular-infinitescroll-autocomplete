import { Injectable } from '@angular/core';

import { Keys } from '../../../secret-keys';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class AuthKeysService {
  publicKey = Keys.PUBLIC_KEY;
  privateKey = Keys.PRIVATE_KEY;

  constructor() { }

  getPublicKey() {
    return this.publicKey;
  }

  getHash(timeMillis: number) {
    return Md5.hashStr(timeMillis + this.privateKey + this.publicKey);
  }
}
