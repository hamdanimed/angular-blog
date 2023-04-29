import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../data-types/post';
import { User } from '../data-types/user';
import { Category } from '../data-types/category';
import { Picture } from '../data-types/picture';
import { CommentInteraction } from '../data-types/comment';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent {
  falike = faThumbsUp;
  facomment = faCommentAlt;
  faback = faArrowLeft;

  post!:Post;
  user!:User;
  category!:Category;
  picture!:Picture;
  avatar!:Picture;
  date!:Date|null;
  comments!:CommentInteraction[];
  commentsUsers:User[]=[];
  commentsUsersAvatars:Picture[]=[];
  likesCounter:number=0;
  commentsCounter:number=0;

  constructor(private fakeDataService: FakeDataService,private route:ActivatedRoute, private location: Location){}

  ngOnInit(){
    //get the post form service
    this.fakeDataService.getPost(Number(this.route.snapshot.paramMap.get('id'))).subscribe((post)=>{
      this.post=post;
      //after getting the post
      
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
        this.comments=comments; //can get empty array if the post doesnt have comments
        
        //after getting the comments array
        //get the users that commented on the post
        this.comments.forEach((comment)=>{
          this.fakeDataService.getUser(comment.userId).subscribe((user)=>{
            this.commentsUsers.push(user);
            //get the avatars of the users that commented on the post
            this.fakeDataService.getPicture(user.avatarId).subscribe((avatar)=>{
              this.commentsUsersAvatars.push(avatar);
            })
          })
        })
        this.commentsCounter=comments.length;
      })
      //get the likes of the post
      this.fakeDataService.getLikes(this.post.id).subscribe((likes)=>{
        this.likesCounter=likes.length;
      })
    
    })

  }

  goBack(){
    this.location.back();
  }
}
