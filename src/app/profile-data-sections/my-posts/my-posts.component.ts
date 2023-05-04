import { Component ,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faPlus,faThumbsUp,faCommentAlt,faEye,faPen,faTrash } from '@fortawesome/free-solid-svg-icons'
import { Category } from 'src/app/data-types/category';
import { EagerPost } from 'src/app/data-types/eagerPost';
import { Post } from 'src/app/data-types/post';
import { FakeDataService } from 'src/app/services/fake-data-service/fake-data.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent {
  faPlus=faPlus;
  faThumbsUp=faThumbsUp;
  faCommentAlt=faCommentAlt;
  faEye=faEye;
  faPen=faPen;
  faTrash=faTrash;

  filter:string = ""
  setFilter(filter:string){
    this.filter = filter;
    this.updatePosts();
  }
  updatePosts(){
    if(this.filter==='newest'){
      this.eagerPosts.sort((a,b) => b.post.date - a.post.date)
    }
    else if(this.filter==='popular'){
      this.eagerPosts.sort((a,b) => b.likesCount - a.likesCount)

    }
  }

  // posts!:Post[];
  eagerPosts:EagerPost[] = [];
  // categories:Category[]=[];
  // dates:Date[]=[];
  // likesCounters:number[]=[];
  // commentsCounters:number[]=[];

  constructor(private route:ActivatedRoute,private fakeDataService:FakeDataService){}
  ngOnInit(){
    //get the route parameters from the parent route
    this.route.parent?.params.subscribe((params)=>{
      //get the following list of the user with the id in parameter
      this.fakeDataService.getUserPosts(params['id']).subscribe((posts)=>{
        // this.posts=posts;
        posts.forEach((post)=>{
          let eagerPost = {} as EagerPost;
          eagerPost.post = post;
          eagerPost.date = new Date(post.date*1000);
          //converte date from timestamp to a Date object for each post
          // this.dates.push(new Date(post.date*1000));
          //get categorie object for each post's categorie
          this.fakeDataService.getCategory(post.categorieId).subscribe((category)=>{
            // this.categories.push(category);
            eagerPost.category= category;
          })
          //get comments for each posts to get the number of comments
          this.fakeDataService.getComments(post.id).subscribe((comments)=>{
            // this.commentsCounters.push(comments.length);
            eagerPost.commentsCount = comments.length;
          })
          //get likes for each posts to get the number of likes
          this.fakeDataService.getLikes(post.id).subscribe((likes)=>{
            // this.likesCounters.push(likes.length);
            eagerPost.likesCount = likes.length;
            this.eagerPosts.push(eagerPost)
            console.log(this.eagerPosts);
          })
        })

      })

    })
  }

}
