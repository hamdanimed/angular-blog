import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../data-types/post';
import { User } from '../data-types/user';
import { Category } from '../data-types/category';
import { Picture } from '../data-types/picture';
import { CommentInteraction } from '../data-types/comment';
import { FirebaseService } from '../services/firebase-service/firebase.service';



@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})

export class PostCommentComponent {
  falike = faThumbsUp;
  facomment = faCommentAlt;
  faback = faArrowLeft;
  fasend = faPaperPlane;
  faTimes = faTimes;
  faPencil = faPencil;

  post!:any;
  loggedInUser!:any;
  postUser!:any;
  category!:any;
  // picture!:Picture;
  avatar!:Picture;
  date!:Date|null;
  comments!:any[];
  commentsUsers:any[]=[];
  commentsUsersAvatars:Picture[]=[];
  likesCounter:number=0;
  commentsCounter:number=0;
  commentText: string = '';

  didUserLikePost:boolean=false;
  likeObject!:any;
  commentToBeEdited:any={id:"none",content:'',date:0,postId:""};
  commentToDeleteId:any="";
  followText:any='Follow';
  followObject!:any;

  constructor(private fakeDataService: FakeDataService,private firebase:FirebaseService,private route:ActivatedRoute, private location: Location){}

  ngOnInit(){

    // //get the post form service
    // this.fakeDataService.getPost(Number(this.route.snapshot.paramMap.get('id'))).subscribe((post)=>{
    //   this.post=post;
    //   //after getting the post

    //   this.date=new Date(this.post?.date*1000); //convert post date from timestamp to the object date to use the date pipe of angular
    //   //get the object user of the author of the post
    //   this.fakeDataService.getUser(this.post.userId).subscribe((user)=>{
    //     this.user=user;
    //     //after getting the user object
    //     //get the picture object of the author's avatar
    //     this.fakeDataService.getPicture(this.user.avatarId).subscribe((avatar)=>{
    //       this.avatar=avatar;
    //     })
    //   })
    //   //get the category
    //   this.fakeDataService.getCategory(this.post.categorieId).subscribe((category)=>{
    //     this.category=category;
    //   })
    //   //if the post has a pictures , get the first picture of the array
    //   if(this.post.picturesId.length){
    //     this.fakeDataService.getPicture(this.post.picturesId[0]).subscribe((picture)=>{
    //       this.picture=picture;
    //     })
    //   }
    //    //get the comments of the post
    //   this.fakeDataService.getComments(this.post.id).subscribe((comments)=>{
    //     this.comments=comments; //can get empty array if the post doesnt have comments

    //     //after getting the comments array
    //     //get the users that commented on the post
    //     this.comments.forEach((comment)=>{
    //       this.fakeDataService.getUser(comment.userId).subscribe((user)=>{
    //         this.commentsUsers.push(user);
    //         //get the avatars of the users that commented on the post
    //         this.fakeDataService.getPicture(user.avatarId).subscribe((avatar)=>{
    //           this.commentsUsersAvatars.push(avatar);
    //         })
    //       })
    //     })
    //     this.commentsCounter=comments.length;
    //   })

    //   //get the likes of the post
    //   this.fakeDataService.getLikes(this.post.id).subscribe((likes)=>{
    //     this.likesCounter=likes.length;
    //   })

    // })
    this.loggedInUser=this.firebase.user;
    this.firebase.getPost(this.route.snapshot.paramMap.get('id') as string).subscribe(post=>{
      this.post=post.data();
      this.postUser={username:this.post.username};
      this.post.id=this.route.snapshot.paramMap.get('id') as string;
      // console.log(this.post)

      this.date=new Date(this.post?.date);
      //get the category
      this.firebase.getCategory(this.post.categorieId).subscribe((category)=>{
        this.category=category.data();
      })

       //get the comments of the post
      this.firebase.getComments().subscribe((comments)=>{
        // console.log(comments[0]['postId'],this.post.id)
        // console.log(comments.filter(comment=>comment['postId']===this.post.id))
        this.comments=comments.filter(comment=>comment['postId']===this.post.id); //can get empty array if the post doesnt have comments
        //after getting the comments array
        this.comments.sort((a:any,b:any)=>  (a.date-b.date))
        //get the users that commented on the post
        this.commentsUsers=this.comments.map(comment=>{return {username:comment['username']}});
        this.commentsCounter=this.comments.length;
      })

      this.firebase.getFollowers().subscribe((followers)=>{
        console.log(followers);
        if(followers.filter(follow=>(follow['idFollower']===this.loggedInUser.username.toLowerCase() && follow['idFollowed']===this.postUser.username.toLowerCase())).length === 0){
          this.followText='Follow';
        }else{
          this.followObject=followers.filter(follow=>(follow['idFollower']===this.loggedInUser.username.toLowerCase() && follow['idFollowed']===this.postUser.username.toLowerCase()))[0];
          this.followText='Unfollow';
        }
      })

      this.firebase.getLikes().subscribe(likes=>{
        const postLikes=likes.filter(like=>like['postId']===this.post.id);
        this.likesCounter=postLikes.length;
    
        if(postLikes.filter(like=>like['username']===this.loggedInUser.username).length !==0){
          this.likeObject=postLikes.filter(like=>like['username']===this.loggedInUser.username)[0];
          this.didUserLikePost=true;
        }
      })

     })

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

  onSubmit() {
    //do nothing if the message is empty
    if (this.commentText.trim() === '') {

      return;
    }
    const comment: any = {
      // id: null,
      username: this.loggedInUser.username, // Set current user ID as comment's user ID
      postId: this.post.id,
      date: new Date().getTime(),//Date.now(),
      content: this.commentText
    };
    this.firebase.addComment(comment).subscribe(()=>{
      console.log('comment wad added')
      this.commentText='';
    })
      // Call addComment method from fakeDataService to add new comment
    // this.fakeDataService.addComment(comment).subscribe(() => {
    //   // Clear the input text
    //   this.commentText = '';
    //   this.fakeDataService.getComments(this.post.id).subscribe((comments)=>{
    //     this.comments=comments; //can get empty array if the post doesnt have comments

    //     //after getting the comments array
    //     //get the users that commented on the post
    //       this.fakeDataService.getUser(comment.userId).subscribe((user)=>{
    //         this.commentsUsers.push(user);
    //         //get the avatars of the users that commented on the post
    //         this.fakeDataService.getPicture(user.avatarId).subscribe((avatar)=>{
    //           this.commentsUsersAvatars.push(avatar);
    //         })
    //       })

    //     this.commentsCounter=comments.length;
    //   })
    // });
  }

  verifyDeleteComment(commentId:any,dialog:HTMLDialogElement){
    dialog.showModal();
    this.commentToDeleteId=commentId;
    
  }
  deleteComment(dialog:HTMLDialogElement){
    dialog.close();
    if(this.commentToDeleteId.length){
      this.firebase.deleteComment(this.commentToDeleteId).subscribe(()=>{
        console.log('comment was deleted')
      })
    }
    this.commentToDeleteId="";
  }
  cancelCommentDeletion(dialog:HTMLDialogElement){
    this.commentToDeleteId="";
    dialog.close();
  }

  editComment(comment:any){
    if(this.commentToBeEdited.id !== comment.id){
      this.commentToBeEdited=comment;
    }else{
      this.firebase.updateComment(comment).subscribe(()=>{
        console.log('comment updated')
      })
      this.commentToBeEdited={id:"none",content:'',date:0,postId:""};
    }
  }

  goBack(){
    this.location.back();
  }

}
