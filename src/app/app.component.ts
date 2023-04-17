import { Component } from '@angular/core';
import { FakeDataService } from './services/fake-data-service/fake-data.service';
import { User } from './data-types/user';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Follow } from './data-types/follow';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCoffee = faCoffee;
  
  title = 'angular-blog';
  users : User[] | undefined;

  constructor(private fakeDataService: FakeDataService){}

  ngOnInit(){
    // this.fakeDataService.getPictures().subscribe(pictures => (console.log(pictures)));
    // this.fakeDataService.getUsers().subscribe(users => (console.log(users)));
    // this.fakeDataService.getPosts().subscribe(posts => (console.log(posts)));
    // this.fakeDataService.getComments(1).subscribe(comments => (console.log(comments)));
    // this.fakeDataService.getFollowers(1).subscribe(followers => {console.log(followers.length);console.log(followers)})
    // this.fakeDataService.getFollowing(1).subscribe(following => {console.log(following.length);console.log(following)})
    // this.fakeDataService.isFollowing(2,3).subscribe(follows => (console.log(follows)));
    
    // this.fakeDataService.isFollowing(2,3).subscribe(follows => {console.log("isFollowing 2 3: ",follows)});
    // let followId;
    this.fakeDataService.getFollowing(1).subscribe(followers => {console.log(`${1} followersList:`,followers)});
    let follow:Follow={id:null,idFollower:1,idFollowed:3};
    this.fakeDataService.addFollow(follow).subscribe(follow=>{
      console.log("add follow",follow);
      this.fakeDataService.getFollowing(1).subscribe(followers => {console.log(`${1} followersList:`,followers)});
    });


    //unfollowing Situation]
    // console.log("unfollowing situation")
    // let followedId=1;
    // let followerId=2;
    // this.fakeDataService.getFollowers(followedId).subscribe(followers => {console.log(`${followedId} followersList:`,followers)});
    // this.fakeDataService.getFollowing(followerId).subscribe(
    //   list=>{
    //     let followId=list.filter(follow=>{return follow.idFollowed===followedId});
    //     this.fakeDataService.unfollow(followId[0]?.id).subscribe(follow=>(console.log(`${followerId} unfollowing ${followedId}`,follow)));
    //     this.fakeDataService.getFollowers(followedId).subscribe(followers => {console.log(`${followedId} followersList:`,followers)});
    //   });
  }

}
