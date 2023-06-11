import { Component, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../data-types/post';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { User } from '../data-types/user';
import { Category } from '../data-types/category';
import { Picture } from '../data-types/picture';
import { FirebaseService } from '../services/firebase-service/firebase.service';
import { Router } from '@angular/router';

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

    @Input() post!:any ;
    loggedInUser!:any;
    postUser!:any;
    category!:any;
    picture:any={url:"https://picsum.photos/500",alt:"image from somewher"};
    avatar!:Picture;
    date!:Date|null;
    likesCounter!:number;
    commentsCounter!:number;

    didUserLikePost:boolean=false;
    likeObject!:any;
    followText:any='Follow';
    followObject!:any;
    
    constructor(private fakeDataService: FakeDataService,private firebase:FirebaseService,private router:Router){}
    ngOnInit(){
      this.loggedInUser=this.firebase.user;
      this.postUser={username:this.post.username};
      this.date=new Date(this.post?.date); //convert post date from timestamp to the object date to use the date pipe of angular
      //get the object user of the author of the post
      // this.fakeDataService.getUser(this.post.userId).subscribe((user)=>{
      //   this.user=user;
      //   //after getting the user object
      //   //get the picture object of the author's avatar
      //   this.fakeDataService.getPicture(this.user.avatarId).subscribe((avatar)=>{
      //     this.avatar=avatar;
      //   })
      // })
      //get the category
      this.firebase.getCategory(this.post.categorieId).subscribe((category)=>{
        this.category=category.data();
      })
      // this.fakeDataService.getCategory(this.post.categorieId).subscribe((category)=>{
      //   this.category=category;
      // })
      //if the post has a pictures , get the first picture of the array
      // if(this.post.picturesId.length !== 0){
      //   this.fakeDataService.getPicture(this.post.picturesId[0]).subscribe((picture)=>{
      //     this.picture=picture;
      //   })
      // }
      this.firebase.getFollowers().subscribe((followers)=>{
        console.log(followers);
        if(followers.filter(follow=>(follow['idFollower']===this.loggedInUser.username.toLowerCase() && follow['idFollowed']===this.postUser.username.toLowerCase())).length === 0){
          this.followText='Follow';
        }else{
          this.followObject=followers.filter(follow=>(follow['idFollower']===this.loggedInUser.username.toLowerCase() && follow['idFollowed']===this.postUser.username.toLowerCase()))[0];
          this.followText='Unfollow';
        }
      })
      //get the comments of the post
      this.firebase.getComments().subscribe(comments=>{
        // console.log(this.post.id,comments[0]['postId']);
        this.commentsCounter=comments.filter(comment=>comment['postId']===this.post.id).length;
      })
      // this.fakeDataService.getComments(this.post.id).subscribe((comments)=>{
      //   this.commentsCounter=comments.length;
      // })
      //get the likes of the post
      this.firebase.getLikes().subscribe(likes=>{
        const postLikes=likes.filter(like=>like['postId']===this.post.id);
        this.likesCounter=postLikes.length;
    
        if(postLikes.filter(like=>like['username']===this.loggedInUser.username).length !==0){
          this.likeObject=postLikes.filter(like=>like['username']===this.loggedInUser.username)[0];
          this.didUserLikePost=true;
        }
      })
      // this.firebase.getLikes().subscribe(likes=>{
      //   this.likesCounter=likes.filter(like=>like['postId']===this.post.id).length;
      // })
      // this.fakeDataService.getLikes(this.post.id).subscribe((likes)=>{
      //   this.likesCounter=likes.length;
      // })
    }

    toggleLikePost(){
      if(this.didUserLikePost===true){
        console.log(this.likeObject.id)
        this.firebase.deleteLike(this.likeObject.id).subscribe(()=>{
          console.log('like removed')
          this.didUserLikePost=false;
        })
      }else{
        const like:any={
          username:this.loggedInUser.username,
          date:new Date().getTime(),
          postId:this.post.id
        }
        this.firebase.addLike(like).subscribe(()=>{
          console.log('like was added')
        })
      }
    }

    toggleFollow(){
      if(this.followText.toLowerCase()==='unfollow'){
        this.firebase.deleteFollow(this.followObject.id).subscribe(()=>{
          console.log('unfollow the user');
        })
      }else if(this.followText.toLowerCase()==='follow'){
        const follow:any={
          idFollowed:this.postUser.username,
          idFollower:this.loggedInUser.username
        }
        this.firebase.addFollow(follow).subscribe(()=>{
          console.log('follow the user');
          // this.followText=
        })
      }
    }

    redirectToPost(){
      this.router.navigate([`/post/${this.post.id}`])
    }
}
