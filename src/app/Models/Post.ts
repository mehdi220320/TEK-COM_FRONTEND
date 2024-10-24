import {Comments} from "./Comments";
import {FileHandle} from "./FileHandle";
import {Likes} from "./Likes";

export class Post{
  constructor(public id: number,
              public dateAjout: Date,
              public whoPosted: string,
              public community: string,
              public isVisible: boolean,
              public images:FileHandle[],
              public description:string,
              public comments:Comments[],
              public likes: Likes[],
              public selectedImageIndex: number = 0)
  {}
}
