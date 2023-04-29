import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faThumbsUp,faCommentAlt} from '@fortawesome/free-solid-svg-icons'
import { Category } from 'src/app/data-types/category';
import { Post } from 'src/app/data-types/post';
import { FakeDataService } from 'src/app/services/fake-data-service/fake-data.service';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrls: ['./liked-posts.component.css']
})
export class LikedPostsComponent {
  faThumbsUp=faThumbsUp;
  faCommentAlt=faCommentAlt;

  posts:Post[]=[];
  categories:Category[]=[];
  dates:Date[]=[];
  likesCounters:number[]=[];
  commentsCounters:number[]=[];

  constructor(private route:ActivatedRoute,private fakeDataService:FakeDataService){}
  ngOnInit(){
    //get the route parameters from the parent route
    this.route.parent?.params.subscribe((params)=>{
      //get the following list of the user with the id in parameter
      this.fakeDataService.getLikedUsersPosts(params['id']).subscribe((likes)=>{
        likes.forEach((like)=>{
          this.fakeDataService.getPost(like.postId).subscribe((post)=>{
            this.posts.push(post)
            //converte date from timestamp to a Date object for each post
          this.dates.push(new Date(post.date*1000));
          //get categorie object for each post's categorie
          this.fakeDataService.getCategory(post.categorieId).subscribe((category)=>{
            this.categories.push(category);
          })
          //get comments for each posts to get the number of comments
          this.fakeDataService.getComments(post.id).subscribe((comments)=>{
            this.commentsCounters.push(comments.length);
          })
          //get likes for each posts to get the number of likes
          this.fakeDataService.getLikes(post.id).subscribe((likes)=>{
            this.likesCounters.push(likes.length);
          })
          })
        })

      })

    })
  }
}
