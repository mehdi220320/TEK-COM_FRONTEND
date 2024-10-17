export class Post{
  constructor(public id: number,
              public dateAjout: Date,
              public whoPosted: string,
              public community: string,
              public isVisible: boolean,
              public images:string[],
              public description:string,
              public selectedImageIndex: number = 0)
  {}
}
