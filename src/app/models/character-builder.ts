import { Response, Character, ResponseData } from './models';

export class CharacterBuilder {
  static build(): Character {
    return new Character(0, '', '', null, '', [], null, [], [], [], []);
  }
}
