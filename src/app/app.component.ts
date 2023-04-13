import { Component } from '@angular/core';
import { FakeDataService } from './fake-data.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-blog';
  users : User[] | undefined;

  constructor(private fakeDataService: FakeDataService){}

  ngOnInit(){
    this.fakeDataService.getPictures().subscribe(pictures => (console.log(pictures)));
    this.fakeDataService.getUsers().subscribe(users => (console.log(users)));
    this.fakeDataService.getPosts().subscribe(posts => (console.log(posts)));
    this.fakeDataService.getComments(12).subscribe(comments => (console.log(comments)));
    this.fakeDataService.getFollowers(13).subscribe(followers => {console.log(followers.length);console.log(followers)})
    this.fakeDataService.getFollowing(13).subscribe(following => {console.log(following.length);console.log(following)})
    this.fakeDataService.isFollowing(12,14).subscribe(follows => (console.log(follows)));
  }
}
