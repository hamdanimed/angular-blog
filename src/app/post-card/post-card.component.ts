import { Component, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../data-types/post';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { User } from '../data-types/user';
import { Category } from '../data-types/category';
import { Picture } from '../data-types/picture';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
    falike = faThumbsUp;
    facomment = faCommentAlt;

    userId:number=2;
    // postId:number=2;

    @Input() post!:Post ;
    user!:User;
    category!:Category;
    picture!:Picture;
    avatar!:Picture;
    date!:Date|null;
    likesCounter:number=0;
    commentsCounter:number=0;
    
    constructor(private fakeDataService: FakeDataService){}
    ngOnInit(){
      this.date=new Date(this.post?.date*1000); //convert post date from timestamp to the object date to use the date pipe of angular
      //get the object user of the author of the post
      this.fakeDataService.getUser(this.post.userId).subscribe((user)=>{
        this.user=user;
        //after getting the user object
        //get the picture object of the author's avatar
        this.fakeDataService.getPicture(this.user.avatarId).subscribe((avatar)=>{
          this.avatar=avatar;
        })
      })
      //get the category
      this.fakeDataService.getCategory(this.post.categorieId).subscribe((category)=>{
        this.category=category;
      })
      //if the post has a pictures , get the first picture of the array
      if(this.post.picturesId.length){
        this.fakeDataService.getPicture(this.post.picturesId[0]).subscribe((picture)=>{
          this.picture=picture;
        })
      }
      //get the comments of the post
      this.fakeDataService.getComments(this.post.id).subscribe((comments)=>{
        this.commentsCounter=comments.length;
      })
      //get the likes of the post
      this.fakeDataService.getLikes(this.post.id).subscribe((likes)=>{
        this.likesCounter=likes.length;
      })
    }

    // this.postId=Number(this.post.id);
}
