import {File2} from "./Post";

export class User {
  constructor(public id:number,
              public nom:string,
              public prenom: string,
              public username:string ,
              public email:string,
              public birthday:Date,
              public role:string,
              public status:string,
              public image:File2
              ) {}
}
