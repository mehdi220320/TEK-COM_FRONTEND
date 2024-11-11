import {Post} from "./Post";
import {User} from "./User";

export class Comments {
  constructor(  public id:number | null,
               public description:string,
               public date: Date,
               public username:User,
                public post:Post
  ) {
  }



}
