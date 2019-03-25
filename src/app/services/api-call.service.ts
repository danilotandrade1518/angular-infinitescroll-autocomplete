import { AuthKeysService } from './auth-keys.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Response, Character } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient, private authKeysService: AuthKeysService) { }

  getCharacters(search: string, offset: number): Observable<Response<Character>> {
    const ts = new Date().getMilliseconds();
    const publicKey = this.authKeysService.getPublicKey();
    const hash = this.authKeysService.getHash(ts);

    return this.http.get<Response<Character>>(
      `${this.apiUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${search}&limit=10&offset=${offset}`
    );
  }
}
