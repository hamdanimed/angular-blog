import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { User } from '../data-types/user';
import { Picture } from '../data-types/picture';
import { Follow } from '../data-types/follow';
import { ActivatedRoute } from '@angular/router';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';

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
  user!:User;
  avatar!:Picture;
  followers!:Follow[];
  following!:Follow[];

  constructor(private location: Location,private route: ActivatedRoute, private fakeDataService: FakeDataService){}
  ngOnInit(){
    //get the user object 
    this.fakeDataService.getUser(Number(this.route.snapshot.paramMap.get('id'))).subscribe((user)=>{
      this.user=user;
      //get the avatar picture of the user
      this.fakeDataService.getPicture(this.user.avatarId).subscribe((picture)=>{
        this.avatar=picture;
      })
      //get the followers list
      this.fakeDataService.getFollowers(this.user.id).subscribe((followers)=>{
        this.followers=followers;
        this.fakeDataService.followers=followers;
      })
      //get the following list
      this.fakeDataService.getFollowing(this.user.id).subscribe((following)=>{
        this.following=following;
        this.fakeDataService.following.next(following);
      })
    })
  }

  // constructor(private location: Location){}
  goBack(){this.location.back();}
}
