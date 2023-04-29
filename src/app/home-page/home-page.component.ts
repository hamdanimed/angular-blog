import { Component } from '@angular/core';
import { FakeDataService } from '../services/fake-data-service/fake-data.service';
import { Post } from '../data-types/post';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  posts:Post[]=[];

  constructor(private fakeDataService : FakeDataService){}
  ngOnInit(){
    this.fakeDataService.getPosts().subscribe((posts)=>{
      this.posts=posts;
      console.log(posts);
    });
  }
}
