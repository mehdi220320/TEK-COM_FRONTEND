import {Post} from "./Post";
export interface Report{
  id:number,
  post:number,
  cause:string,
  date_ajout: Date,
  whoposted:string,
  etat:string,
  description:string,
  whoreported:string
}
