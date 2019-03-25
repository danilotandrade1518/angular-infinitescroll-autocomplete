class Comic {
  constructor(public id:	number,
              public digitalId:	number,
              public title:	string,
              public issueNumber:	number,
              public variantDescription:	string,
              public description:	string,
              public modified:	Date,
              public isbn:	string,
              public upc:	string,
              public diamondCode:	string,
              public ean:	string,
              public issn:	string,
              public format:	string,
              public pageCount:	number,
              public textObjects:	string[],
              public resourceURI:	string,
              public urls:	string[],
              public thumbnail:	string,
             ) {}
}

class Storie {
  constructor(
    public id:	number,
    public title:	string,
    public description:	string,
    public resourceURI:	string,
    public type:	string,
    public modified:	Date,
    public thumbnail:	string,
  ) {}
}

class Event {
  constructor(
    public id: number,
    public title:	string,
    public description:	string,
    public resourceURI:	string,
    public urls:	string[],
    public modified:	Date,
    public start:	Date,
    public end:	Date,
    public thumbnail:	string,
  ) {}
}

class Serie {
  constructor(
    public id: number,
    public title:	string,
    public description:	string,
    public resourceURI:	string,
    public urls: string[],
    public startYear:	number,
    public endYear:	number,
    public rating:	string,
    public modified:	Date,
    public thumbnail:	string,
  ) {}
}

class Thumbnail {
  constructor(
    public path: string,
    public extension:	string,
  ) {}
}

export class Character {
  constructor(public id: number,
              public name: string,
              public description: string,
              public modified: Date,
              public resourceURI: string,
              public urls: string[],
              public thumbnail: Thumbnail,
              public comics: Comic[],
              public stories: Storie[],
              public events: Event[],
              public series: Serie[],
              ) { }
}

export class ResponseData<T> {
  constructor(
    public offset: number,
    public limit: number,
    public total: number,
    public count: number,
    public results: T[],
  ) {}
}

export class Response<T> {
  constructor(
    public code: number,
    public status: string,
    public copyright: string,
    public attributionText: string,
    public attributionHTML: string,
    public etag: string,
    public data: ResponseData<T>
  ) {}
}
