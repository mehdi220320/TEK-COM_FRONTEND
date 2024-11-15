import {Post} from "./Post";

export class report {
  constructor(public _id:number,
              public _post:Post,
              public _cause:String,
              public _date: Date,

  ) {}

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get post(): Post {
    return this._post;
  }

  set post(value: Post) {
    this._post = value;
  }

  get cause(): String {
    return this._cause;
  }

  set cause(value: String) {
    this._cause = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
