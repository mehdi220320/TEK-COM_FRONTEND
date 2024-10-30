export class Comments {
  constructor(public id:number,
              public description:string,
              public date: Date,
              public username:string,
              public postid:string
  ) {
  }
}
