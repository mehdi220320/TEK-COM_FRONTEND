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
  id: 0, // Assuming '0' is a placeholder for an uninitialized post
  date_ajout: new Date(), // Use the current date or set to a specific date
  whoposted: '', // Empty string for who posted
  community: '', // Empty string for community
  communityID:'',
  content: '', // Empty string for content
  isVisible: true, // Default visibility; adjust as needed
  commentList: [], // Initialize as an empty array
  likeList: [], // Initialize as an empty array
  selectedImageIndex: undefined, // Optional property can be undefined
  showComments: false, // Default to not showing comments
  fileList: [] // Initialize as an empty array
};
