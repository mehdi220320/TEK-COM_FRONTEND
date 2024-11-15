import {Post} from "./Post";
import {User} from "./User";

export interface  Comments {

  id: number;
  description: string;
  date: Date;
  username: string;
  postid: number;


}
