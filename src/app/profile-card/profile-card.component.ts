import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { User } from '../data-types/user';
import { Picture } from '../data-types/picture';
import { Follow } from '../data-types/follow';
import { ActivatedRoute } from '@angular/router';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { FirebaseService } from '../services/firebase-service/firebase.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  faEdit=faEdit;
  faArrowLeft= faArrowLeft;

  //This function is to be used later for dark mode / light mode
  // changeColor(){
  //   let r:HTMLElement|null = document.querySelector(':root');
  //   console.log("changeColor");
  //   let color = r?.style.getPropertyValue('--primary-grey')
  //     if(r)
  //     r.style.setProperty('--primary-grey', (color==='#858585')?'blue':'#858585');

  // }

  // @Input() user!:User;
  // @Input() userAvatar!:Picture;
  // @Input() followers!:Follow[];
  // @Input() following!:Follow[];
  loggedInUser!:any;
  userInPage!:any;
  // avatar!:Picture;
  followers!:any[];
  following!:any[];
  followText:any='Follow';
  followObject!:any;

  constructor(private location: Location,private route: ActivatedRoute,private firebase:FirebaseService,private fakeDataService: FakeDataService){}
  ngOnInit(){
    this.loggedInUser=this.firebase.user;
    this.userInPage={username:this.route.snapshot.paramMap.get('id') as string};
    //get the user object 
    // this.fakeDataService.getUser(Number(this.route.snapshot.paramMap.get('id'))).subscribe((user)=>{
    //   this.user=user;
    //   //get the avatar picture of the user
    //   this.fakeDataService.getPicture(this.user.avatarId).subscribe((picture)=>{
    //     this.avatar=picture;
    //   })
    //   //get the followers list
    //   this.fakeDataService.getFollowers(this.user.id).subscribe((followers)=>{
    //     this.followers=followers;
    //     this.fakeDataService.followers=followers;
    //   })
    //   //get the following list
    //   this.fakeDataService.getFollowing(this.user.id).subscribe((following)=>{
    //     this.following=following;
    //     this.fakeDataService.following.next(following);
    //   })
    // })
    this.firebase.getFollowers().subscribe(followers=>{
      this.followers=followers.filter(follow=>follow.idFollowed===this.userInPage.username);
      this.following=followers.filter(follow=>follow.idFollower===this.userInPage.username);
    })
    this.firebase.getFollowers().subscribe((followers)=>{
      console.log(followers);
      if(followers.filter(follow=>(follow['idFollower']===this.loggedInUser.username.toLowerCase() && follow['idFollowed']===this.userInPage.username.toLowerCase())).length === 0){
        this.followText='Follow';
      }else{
        this.followObject=followers.filter(follow=>(follow['idFollower']===this.loggedInUser.username.toLowerCase() && follow['idFollowed']===this.userInPage.username.toLowerCase()))[0];
        this.followText='Unfollow';
      }
    })
  }

  toggleFollow(){
    if(this.followText.toLowerCase()==='unfollow'){
      this.firebase.deleteFollow(this.followObject.id).subscribe(()=>{
        console.log('unfollow the user');
      })
    }else if(this.followText.toLowerCase()==='follow'){
      const follow:any={
        idFollowed:this.userInPage.username,
        idFollower:this.loggedInUser.username
      }
      this.firebase.addFollow(follow).subscribe(()=>{
        console.log('follow the user');
        // this.followText=
      })
    }
  }

  // constructor(private location: Location){}
  goBack(){this.location.back();}
}
