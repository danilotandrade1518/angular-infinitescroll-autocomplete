import { CharacterResponseBuilder } from './models/character-response-builder';
import { Character, Response } from './models/models';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Subject } from 'rxjs';
import { tap, switchMap, retryWhen } from 'rxjs/operators';
import { ApiCallService } from './services/api-call.service';
import { CharacterBuilder } from './models/character-builder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentSearch = '';
  responseCharacters: Response<Character> = CharacterResponseBuilder.build();
  characters: Character[] = [];
  loading = false;
  selectedCharacter: Character = CharacterBuilder.build();
  currentOffset = 0;

  searchStringSubscription: Subscription;
  getCharactersSubscription: Subscription;

  private searchString: Subject<string> = new Subject<string>();

  constructor(private apiCallService: ApiCallService) { }

  ngOnInit() {
    this.getCharacters();
  }

  ngOnDestroy() {
    this.searchStringSubscription.unsubscribe();
    this.getCharactersSubscription.unsubscribe();
  }

  handleSearchChange(search) {
    this.resetResponse();
    this.searchString.next(search);
  }

  getCharacters() {
    const initLoading = () => this.loading = true;
    const getCharactersFromApi = search => {
      this.loading = true;
      return this.apiCallService.getCharacters(search, 0);
    };
    const handleSuccess = response => {
      this.responseCharacters = response;
      this.characters = this.responseCharacters.data.results;
      this.loading = false;
    };
    const handleErrors = errors => errors.pipe(
      tap(val => {
        this.resetResponse();
        console.log('Erro: ' + val);
      }),
    );

    this.searchStringSubscription = this.searchString.pipe(
      tap(initLoading),
      tap(search => this.currentSearch = search),
      switchMap(getCharactersFromApi),
      tap(handleSuccess),
      retryWhen(handleErrors),
    ).subscribe();
  }

  onScrollAtBottom() {
    const data = this.responseCharacters.data;
    if ( (data.offset + 1) * data.count <= data.total) {
      this.loading = true;
      const offset = this.currentOffset + this.responseCharacters.data.count;

      this.getCharactersSubscription = this.apiCallService.getCharacters(this.currentSearch, offset).pipe(
        tap(response => {
          this.responseCharacters = response;

          this.currentOffset = this.responseCharacters.data.count;
          this.characters = this.characters.concat(this.responseCharacters.data.results);
          this.loading = false;
        })
      ).subscribe();
    }
  }

  private resetResponse() {
    this.responseCharacters = CharacterResponseBuilder.build();
    this.currentOffset = 0;
    this.currentSearch = '';
  }
}
