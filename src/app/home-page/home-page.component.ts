import { Component } from '@angular/core';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { Post } from '../data-types/post';
import { Category } from '../data-types/category';
import { User } from '../data-types/user';
import { Follow } from '../data-types/follow';
import { Like } from '../data-types/like';
import { Firestore, collection, collectionData,doc,setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  tags:Category[]=[];
  // posts:Post[]=[{id:0,picturesId:[6],title:'not yet',userId:1,date:1675112925,content:'not loaded yet',categorieId:1}];
  // shownPosts:Post[] = [{id:0,picturesId:[6],title:'not yet',userId:1,date:1675112925,content:'not loaded yet',categorieId:1}];
  posts:Post[]=[];
  shownPosts:Post[] = [];
  likes:Like[] = []
  following:Follow[] = []
  
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
    this.shownPosts=this.posts.filter((post:Post)=> (this.tag.id===0) || (post.categorieId==this.tag.id) );

    if(this.forYou){
      let followed = this.following.map(follow=> {return follow.idFollowed} );
      this.shownPosts = this.shownPosts.filter((post)=> followed.includes(post.userId))
    }

    if(this.sort==='newest'){
      this.shownPosts.sort((post1:Post,post2:Post) => post2.date - post1.date)
    }
    else if(this.sort==='popular'){
      this.shownPosts.sort((post1:Post,post2:Post) => {
        let likes1 = this.likes.filter((like)=> like.postId===post1.id)
        let likes2 = this.likes.filter((like)=> like.postId===post2.id)
        console.log(likes1);
        return likes2.length - likes1.length;
      })
    }

  }



  tag:Category={id:0,name:'all'};
  setTag(tag:Category){
    this.tag = tag;
    this.updateShownPosts();
    
  }

  constructor(private fakeDataService : FakeDataService,private store:Firestore){}
  ngOnInit(){
    const aCollection=collection(this.store,'categories');
    collectionData(aCollection).subscribe((items)=>{
      console.log(items)
    })

    this.fakeDataService.getAllLikes().subscribe((likes:Like[])=>{
      this.likes=likes;
    })
    this.fakeDataService.getFollowing(1).subscribe((following:Follow[])=>{
      this.following = following;
    })
    
    this.fakeDataService.getPosts().subscribe((posts:Post[])=>{
      this.posts=posts;
      console.log(this.posts);
      this.updateShownPosts();
    });
    this.fakeDataService.getCategories().subscribe((tags:Category[])=>{
      this.tags = tags;
    })
    
  }
}
