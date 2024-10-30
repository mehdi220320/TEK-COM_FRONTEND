import {Comments} from "./Comments";
import {FileHandle} from "./FileHandle";
import {Likes} from "./Likes";

export class Post{

  constructor( private _id: number,
               private _date_ajout: Date,
               private _whoposted: string,
               private _community: string,
               private _content: string,
               private _isVisible: boolean,
               private _images: FileHandle[],
               private _comments: Comments[],
               private _likes: Likes[],
               private _selectedImageIndex: number = 0)
  {}
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get date_ajout(): Date {
    return this._date_ajout;
  }
  public set date_ajout(value: Date) {
    this._date_ajout = value;
  }

  public get whoposted(): string {
    return this._whoposted;
  }
  public set whoposted(value: string) {
    this._whoposted = value;
  }

  public get community(): string {
    return this._community;
  }
  public set community(value: string) {
    this._community = value;
  }

  public get content(): string {
    return this._content;
  }
  public set content(value: string) {
    this._content = value;
  }

  public get isVisible(): boolean {
    return this._isVisible;
  }
  public set isVisible(value: boolean) {
    this._isVisible = value;
  }

  public get images(): FileHandle[] {
    return this._images;
  }
  public set images(value: FileHandle[]) {
    this._images = value;
  }

  public get comments(): Comments[] {
    return this._comments;
  }
  public set comments(value: Comments[]) {
    this._comments = value;
  }

  public get likes(): Likes[] {
    return this._likes;
  }
  public set likes(value: Likes[]) {
    this._likes = value;
  }

  public get selectedImageIndex(): number {
    return this._selectedImageIndex;
  }
  public set selectedImageIndex(value: number) {
    this._selectedImageIndex = value;
  }
}
