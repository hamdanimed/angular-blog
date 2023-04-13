import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Post } from './post';
import { Picture } from './picture';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  constructor(private http:HttpClient) { }
  private picturesUrl = 'api/pictures';
  private usersUrl = 'api/users';
  private postsUrl = 'api/posts';
  private commentsUrl = 'api/comments';
  private likesUrl = 'api/likes';
  private categoriesUrl = 'api/categories';

  getPitcures(): Observable<Picture[]>{
    return this.http.get<Picture[]>(this.picturesUrl);
  }
  
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }
  
  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
  }
}
