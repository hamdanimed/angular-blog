import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  constructor(private route: ActivatedRoute){}
  ngOnInit(){
    console.log(this.route.snapshot.paramMap.get('id'))
  }
}
