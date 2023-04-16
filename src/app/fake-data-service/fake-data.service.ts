import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../data-types/user';
import { Post } from '../data-types/post';
import { Picture } from '../data-types/picture';
import { CommentInteraction } from '../data-types/comment';
import { Follow } from '../data-types/follow';

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

  getPictures(): Observable<Picture[]>{
    return this.http.get<Picture[]>(this.picturesUrl);
  }
  getPicture(id:number): Observable<Picture>{
    const url=`${this.picturesUrl}/${id}`
    return this.http.get<Picture>(url);
  }
  
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }
  getUser(id:number): Observable<User>{
    const url=`${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }
  
  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
  }
  getPost(id:number): Observable<Post>{
    const url=`${this.postsUrl}/${id}`;
    return this.http.get<Post>(url);
  }

  getComments(postId:number): Observable<CommentInteraction[]>{
    const url=`${this.commentsUrl}?postId=${postId}`;
    return this.http.get<CommentInteraction[]>(url);
  }

  getFollowers(idFollowed:number): Observable<Follow[]> {
    const url=`${this.followersUrl}?idFollowed=${idFollowed}`;
    return this.http.get<Follow[]>(url);
  }
  getFollowing(idFollower:number): Observable<Follow[]> {
    const url=`${this.followersUrl}?idFollower=${idFollower}`;
    return this.http.get<Follow[]>(url);
  }
  isFollowing(idFollower:number,idFollowed:number): Observable<Follow[]>{
    const url=`${this.followersUrl}?idFollower=${idFollowed}&idFollowed:${idFollowed}`;
    return this.http.get<Follow[]>(url);
  }
}
