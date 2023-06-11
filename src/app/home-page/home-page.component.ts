import { Component } from '@angular/core';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { Post } from '../data-types/post';
import { Category } from '../data-types/category';
import { User } from '../data-types/user';
import { Follow } from '../data-types/follow';
import { Like } from '../data-types/like';
import { FirebaseService } from '../services/firebase-service/firebase.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  tags:Category[]=[];
  // posts:Post[]=[{id:0,picturesId:[6],title:'not yet',userId:1,date:1675112925,content:'not loaded yet',categorieId:1}];
  // shownPosts:Post[] = [{id:0,picturesId:[6],title:'not yet',userId:1,date:1675112925,content:'not loaded yet',categorieId:1}];
  posts:any[]=[];
  shownPosts:any[] = [];
  likes:any[] = [];
  following:any[] = []
  
  forYou:boolean=false;
  toggleForYou(){
    this.forYou = !this.forYou;
    // console.log(this.forYou);
    this.updateShownPosts();
  }

  sort:string="popular";
  setSort(sort:string){
    this.sort = sort;
    this.updateShownPosts();
  }

  updateShownPosts(){
    this.shownPosts=this.posts.filter((post)=> (this.tag.id===0) || (post.categorieId==this.tag.id) );

    if(this.forYou){
      let followed = this.following.map(follow=> {return follow.idFollowed} );
      // console.log(followed,this.shownPosts)
      this.shownPosts = this.shownPosts.filter((post)=> followed.includes(post.username))
    }

    if(this.sort==='newest'){
      this.shownPosts.sort((post1:any,post2:any) => post2.date - post1.date)
    }
    else if(this.sort==='popular'){
      this.shownPosts.sort((post1:any,post2:any) => {
        let likes1 = this.likes.filter((like)=> like.postId===post1.id)
        let likes2 = this.likes.filter((like)=> like.postId===post2.id)
        // console.log(likes1);
        return likes2.length - likes1.length;
      })
    }

  }

  tag:Category={id:0,name:'all'};
  setTag(tag:Category){
    this.tag = tag;
    this.updateShownPosts();
  }

  loggedInUser!:any;

  constructor(private fakeDataService : FakeDataService,private firebase:FirebaseService){}

  ngOnInit(){
    // this.firebase.getCategory(1).subscribe((category)=>{
    //   // console.log(category.data())
    // })
    // this.firebase.getPost("PIrTAS6jmcWpBLvi8xmI").subscribe((post)=>{
    //   // console.log(post.data());
    // })
    this.loggedInUser=this.firebase.user;
    this.firebase.getLikes().subscribe((likes)=>{
      this.likes=likes;
      this.updateShownPosts();
    })
    // this.fakeDataService.getAllLikes().subscribe((likes:Like[])=>{
      //   this.likes=likes;
    // })
    this.firebase.getFollowers().subscribe((followers)=>{
      this.following=followers.filter(follow=>follow.idFollower===this.loggedInUser.username);
      // console.log("following",this.following);
      this.updateShownPosts();
    })
    // this.fakeDataService.getFollowing(1).subscribe((following:Follow[])=>{
    //   this.following = following;
    // })
    
    this.firebase.getPosts().subscribe((posts)=>{
      // console.log(posts)
      this.posts=posts;
      this.updateShownPosts();
    })
    // this.fakeDataService.getPosts().subscribe((posts:Post[])=>{
      //   this.posts=posts;
      //   // console.log(this.posts);
      //   this.updateShownPosts();
      // });
    this.firebase.getCategories().subscribe((categories: any)=>{
      this.tags=categories;
      // console.log(categories)
    })
    // this.fakeDataService.getCategories().subscribe((tags:Category[])=>{
    //   this.tags = tags;
    // })
    
  }
}
