import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faThumbsUp,faCommentAlt} from '@fortawesome/free-solid-svg-icons'
import { Category } from 'src/app/data-types/category';
import { EagerPost } from 'src/app/data-types/eagerPost';
import { Post } from 'src/app/data-types/post';
import { FakeDataService } from 'src/app/services/fake-data-service/fake-data.service';
import { FirebaseService } from 'src/app/services/firebase-service/firebase.service';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.css']
})
export class LikedPostsComponent {
  faThumbsUp=faThumbsUp;
  faCommentAlt=faCommentAlt;

  filter:string = ""
  setFilter(filter:string){
    this.filter = filter
    this.updatePosts()
  }
  updatePosts(){
    if(this.filter==="newest"){
      this.eagerPosts.sort((a:any,b:any) => b.post.date - a.post.date)
    }
    else if(this.filter==='popular'){
      this.eagerPosts.sort((a:any,b:any) => b.likesCount - a.likesCount)

    }
  }

  eagerPosts:any[] = [];
  // posts:Post[]=[];
  // categories:Category[]=[];
  // dates:Date[]=[];
  // likesCounters:number[]=[];
  // commentsCounters:number[]=[];
  userInPage!:any;

  constructor(private route:ActivatedRoute,private firebase:FirebaseService,private fakeDataService:FakeDataService){}
  ngOnInit(){
    //get the route parameters from the parent route
    this.route.parent?.params.subscribe((params)=>{
      this.userInPage={username:params['id']};
      //get the following list of the user with the id in parameter
      this.firebase.getLikes().subscribe(likes=>{
        const userInPageLikes=likes.filter(like=>like.username===this.userInPage.username);
        let post:any[]=[];
        
        this.firebase.getCategories().subscribe(categories=>{
          console.log(categories[0]['id'])
        })
        
        userInPageLikes.forEach(like=>{
          this.firebase.getPost(like.postId).subscribe((post)=>{
            let eagerPost :any = {post:{},date:0,category:"",commentsCount:0,likesCount:0};
            eagerPost.post=post.data();
            eagerPost.post.id=like.postId;
            eagerPost.date=new Date(eagerPost.post.date);
            console.log(eagerPost)

            this.firebase.getCategories().subscribe(categories=>{
              // categories=categories
              console.log(String(eagerPost.post.categorieId))
              eagerPost.category=categories.filter(categorie=>{return categorie['id']===String(eagerPost.post.categorieId)})[0];
            });

            this.firebase.getComments().subscribe(comments=>{
              eagerPost.commentsCount=comments.filter(comment=>comment['postId']===eagerPost.post.id).length;
            })

            this.firebase.getLikes().subscribe(likes=>{
              eagerPost.likesCount=likes.filter(oneLike=>oneLike['postId']===eagerPost.post.id).length;
            })

            console.log(eagerPost)
            this.eagerPosts.push(eagerPost);
          })
        })
        // this.eagerPosts=userInPageLikes.map(like=>{
        //   return {post:}
        // })
      })
      // this.fakeDataService.getLikedUsersPosts(params['id']).subscribe((likes)=>{
      //   likes.forEach((like)=>{
      //     this.fakeDataService.getPost(like.postId).subscribe((post)=>{
      //       let eagerPost = {} as EagerPost; 
      //       eagerPost.post = post;
      //       //converte date from timestamp to a Date object for each post
      //     eagerPost.date = new Date(post.date*1000);
      //     //get categorie object for each post's categorie
      //     this.fakeDataService.getCategory(post.categorieId).subscribe((category)=>{
      //       eagerPost.category = category
      //     })
      //     //get comments for each posts to get the number of comments
      //     this.fakeDataService.getComments(post.id).subscribe((comments)=>{
      //       eagerPost.commentsCount = comments.length
      //     })
      //     //get likes for each posts to get the number of likes
      //     this.fakeDataService.getLikes(post.id).subscribe((likes)=>{
      //       eagerPost.likesCount = likes.length;
      //       this.eagerPosts.push(eagerPost)
            
      //     })
      //     })
      //   })

      // })

    })
  }
}
