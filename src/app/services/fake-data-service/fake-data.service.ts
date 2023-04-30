import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../data-types/user';
import { Post } from '../../data-types/post';
import { Picture } from '../../data-types/picture';
import { CommentInteraction } from '../../data-types/comment';
import { Follow } from '../../data-types/follow';
import {tap} from 'rxjs/operators';
import { Category } from 'src/app/data-types/category';
import { Like } from 'src/app/data-types/like';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  constructor(private http:HttpClient) { }
  private picturesUrl = 'api/pictures';
  private usersUrl = 'api/users';
  private postsUrl = 'api/posts';
  private commentsUrl = 'api/comments';
  private followersUrl = 'api/followers';
  private likesUrl = 'api/likes';
  private categoriesUrl = 'api/categories';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  followers!:Follow[];
  following:Subject<Follow[]> = new Subject<Follow[]>();

  getCategory(id:number): Observable<Category>{
    const url=`${this.categoriesUrl}/${id}`
    return this.http.get<Category>(url);
  }

  // getPictures(): Observable<Picture[]>{
  //   return this.http.get<Picture[]>(this.picturesUrl);
  // }
  getPicture(id:number): Observable<Picture>{
    const url=`${this.picturesUrl}/${id}`
    return this.http.get<Picture>(url);
  }
  addPicture(picture: Picture): Observable<Picture>{
    return this.http.post<Picture>(this.picturesUrl,picture,this.httpOptions);
  }
  
  // getUsers(): Observable<User[]>{
  //   return this.http.get<User[]>(this.usersUrl);
  // }
  getUser(id:number): Observable<User>{
    const url=`${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }
  addUser(user: User): Observable<User>{
    return this.http.post<User>(this.usersUrl,user,this.httpOptions);
  }
  
  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
  }
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.categoriesUrl);

  }
  getUserPosts(userId:number):Observable<Post[]>{
    const url=`${this.postsUrl}?userId=${userId}`;
    return this.http.get<Post[]>(url);
  }
  getPost(id:number): Observable<Post>{
    const url=`${this.postsUrl}/${id}`;
    return this.http.get<Post>(url);
  }
  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.postsUrl,post,this.httpOptions);
  }

  getComments(postId:number): Observable<CommentInteraction[]>{
    const url=`${this.commentsUrl}?postId=${postId}`;
    return this.http.get<CommentInteraction[]>(url);
  }
  addComment(comment:CommentInteraction): Observable<CommentInteraction>{
    return this.http.post<CommentInteraction>(this.commentsUrl,comment,this.httpOptions);
  }

  getLikes(postId:number): Observable<Like[]>{
    const url=`${this.likesUrl}?postId=${postId}`;
    return this.http.get<Like[]>(url);
  }
  getAllLikes():Observable<Like[]>{
    return this.http.get<Like[]>(this.likesUrl)
  }
  getUserLikes(userId:number): Observable<Like[]>{
    const url=`${this.likesUrl}?userId=${userId}`;
    return this.http.get<Like[]>(url);
  }
  addLike(like:Like): Observable<Like>{
    return this.http.post<Like>(this.likesUrl,like,this.httpOptions);
  }

  getFollowers(idFollowed:number): Observable<Follow[]> {
    const url=`${this.followersUrl}?idFollowed=${idFollowed}`;
    return this.http.get<Follow[]>(url);
  }
  getFollowing(idFollower:number): Observable<Follow[]> {
    const url=`${this.followersUrl}?idFollower=${idFollower}`;
    return this.http.get<Follow[]>(url);
  }
  // isFollowing(idFollower:number,idFollowed:number): Observable<Follow[]>{
  //   const url=`${this.followersUrl}?idFollower=${idFollower}&idFollowed:${idFollowed}`;
  //   return this.http.get<Follow[]>(url);
  // }
  addFollow(follow : Follow):Observable<Follow>{
    return this.http.post<Follow>(this.followersUrl,follow,this.httpOptions);
    // .pipe(
    //   tap((newFollow: Follow) => console.log(`added new follow w/ id=${newFollow.id}`))
    // );
  }

  unfollow(id:number): Observable<Follow>{
    
    // console.log("follow id",followId);
    const url=`${this.followersUrl}/${id}`;
    return this.http.delete<Follow>(url,this.httpOptions);
  }
  getLikedUsersPosts(userId:number): Subject<Like[]>{
    let likedPosts:Subject<Like[]>=new Subject<Like[]>();
    this.getUserLikes(userId).subscribe((likes)=>{
        // likes.forEach((like)=>{
        //   this.getPost(like.postId).subscribe((post)=>{
        //     likedPosts.push(post)
        //   })
        // })
      likedPosts.next(likes)
    })
    // new Subject<Post[]>
    return likedPosts;
  }
}
