import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Follow } from 'src/app/data-types/follow';
import { Picture } from 'src/app/data-types/picture';
import { User } from 'src/app/data-types/user';
import { FakeDataService } from 'src/app/services/fake-data-service/fake-data.service';
import { FirebaseService } from 'src/app/services/firebase-service/firebase.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent {

  userInPage!:any;
  loggedInUser!:any;

  following!:any[];
  followingList:any[]=[];
  // followingListAvatars:Picture[]=[];

  constructor(private route: ActivatedRoute,private firebase:FirebaseService,public fakeDataService : FakeDataService){}
  ngOnInit(){
    //get the route parameters from the parent route
    this.route.parent?.params.subscribe((params)=>{
      //get the following list of the user with the id in parameter
      this.userInPage={username:params['id']};
      this.loggedInUser=this.firebase.user;
      console.log(this.userInPage)
      this.firebase.getFollowers().subscribe(followers=>{
        this.following=followers.filter(follow=>follow.idFollower===this.userInPage.username);
        this.followingList=this.following.map(follow=>{return {username:follow.idFollowed}})
      })

      // this.fakeDataService.getFollowing(params['id']).subscribe((following)=>{
      //   this.following=following;
      //   //after getting the following list

      //   this.following.forEach((follow)=>{
      //     //get the user object of each user in the following list
      //     this.fakeDataService.getUser(follow.idFollowed).subscribe((user)=>{
      //       this.followingList.push(user);
      //       //get the avatar of each user in the following list
      //       this.fakeDataService.getPicture(user.avatarId).subscribe((avatar)=>{
      //         this.followingListAvatars.push(avatar)
      //       })
            
      //     })   

      //   })

      // })
   
    })
  }

  unfollow(followId:any){
    this.firebase.deleteFollow(followId).subscribe(()=>{
      console.log("unfollowed user")
    })
  }



}
