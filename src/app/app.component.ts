import { Component } from '@angular/core';
import { FakeDataService } from './fake-data.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-blog';
  users : User[] | undefined;

  constructor(private fakeDataService: FakeDataService){}

  ngOnInit(){
    this.fakeDataService.getPitcures().subscribe(pictures => (console.log(pictures)));
    this.fakeDataService.getUsers().subscribe(users => (console.log(users)));
    this.fakeDataService.getPosts().subscribe(posts => (console.log(posts)));
  }
}
