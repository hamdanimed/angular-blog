import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../data-types/user';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { Picture } from '../data-types/picture';
import { Follow } from '../data-types/follow';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  // user!:User;
  // avatar!:Picture;
  // followers!:Follow[];
  // following!:Follow[];

  // constructor(private route: ActivatedRoute, private fakeDataService: FakeDataService){}
  // ngOnInit(){
  //   //get the user object 
  //   this.fakeDataService.getUser(Number(this.route.snapshot.paramMap.get('id'))).subscribe((user)=>{
  //     this.user=user;
  //     //get the avatar picture of the user
  //     this.fakeDataService.getPicture(this.user.avatarId).subscribe((picture)=>{
  //       this.avatar=picture;
  //     })
  //     //get the followers list
  //     this.fakeDataService.getFollowers(this.user.id).subscribe((followers)=>{
  //       this.followers=followers;
  //       this.fakeDataService.followers=followers;
  //     })
  //     //get the following list
  //     this.fakeDataService.getFollowing(this.user.id).subscribe((following)=>{
  //       this.following=following;
  //       this.fakeDataService.following.next(following);
  //     })
  //   })
  // }
}
