import { Component } from '@angular/core';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { Post } from '../data-types/post';
import { Category } from '../data-types/category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  tags:Category[]=[];
  posts:Post[]=[];
  shownPosts:Post[] = [];
  
  filter:string="none";
  setFilter(filter:string){
    this.filter = filter;
  }
  tag:Category={id:0,name:'all'};
  setTag(tag:Category){
    this.tag = tag;
    this.shownPosts=this.posts.filter((post:Post)=> (this.tag.id===0) || (post.categorieId==this.tag.id) );
    
  }


  constructor(private fakeDataService : FakeDataService){}
  ngOnInit(){
    this.fakeDataService.getPosts().subscribe((posts:Post[])=>{
      this.posts=posts;
      this.shownPosts=posts.filter((post:Post)=> (this.tag.id===0) || (post.categorieId==this.tag.id) );
      console.log(posts);
    });
    this.fakeDataService.getCategories().subscribe((tags:Category[])=>{
      this.tags = tags;
    })
  }
}
