import { Component } from '@angular/core';
import {faHome,faSignOut,faList,faSearch} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {
  faHome=faHome;
  faSignOut = faSignOut;
  faList = faList;
  faSearch = faSearch;
  navOpen="open-nav";
  toggleMenu(){
    console.log("toggleMenu");
    this.navOpen = (this.navOpen==="")?"open-nav":"";
  }

}
