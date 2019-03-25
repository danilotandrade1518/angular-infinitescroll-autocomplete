import { Response, Character, ResponseData } from './models';

export class CharacterResponseBuilder {
  static build(): Response<Character> {
    return new Response(0, '', '', '', '', '', new ResponseData(0, 0, 0, 0, []));
  }
}
