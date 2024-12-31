import {Post} from "./Post";
import {User} from "./User";

export interface  Notification {
   id:number,
   post:Post,
   whoreact:User ;
   user:string;
   type:string;
   date: Date;
   seen:Boolean;
}
