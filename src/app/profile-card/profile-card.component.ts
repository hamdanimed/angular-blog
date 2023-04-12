import { Component } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  faEdit=faEdit;

  //This function is to be used later for dark mode / light mode
  // changeColor(){
  //   let r:HTMLElement|null = document.querySelector(':root');
  //   console.log("changeColor");
  //   let color = r?.style.getPropertyValue('--primary-grey')
  //     if(r)
  //     r.style.setProperty('--primary-grey', (color==='#858585')?'blue':'#858585');

  // }

}
