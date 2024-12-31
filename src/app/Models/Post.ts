import {Likes} from "./Likes";
import {Comments} from "./Comments";

export interface File2 {


  id: string;
  fileName: string;
  fileType: string;
  data: Uint8Array;
}

export interface Post {
  id: number;
  date_ajout: Date;
  whoposted: string;
  community: string;
  communityID:string;
  content: string;
  isVisible: boolean;
  commentList: Comments[];
  likeList: Likes[];
  selectedImageIndex?: number;
  showComments?: boolean;
  fileList: File2[];

}
const initialPost: Post = {
  id: 0,
  date_ajout: new Date(),
  whoposted: '',
  community: '',
  communityID:'',
  content: '',
  isVisible: true,
  commentList: [],
  likeList: [],
  selectedImageIndex: undefined,
  showComments: false,
  fileList: []
};
