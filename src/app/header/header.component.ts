import { Component } from '@angular/core';
import {faHome,faSignOut,faList,faSearch} from '@fortawesome/free-solid-svg-icons'
import { AppComponent } from '../app.component';

import { KeycloakService } from 'keycloak-angular';

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
  navOpen="";
  
  constructor(private readonly keycloak: KeycloakService){}
  
  public endSession() {
    // window.location.replace("http://localhost:8081/realms/angularHerosApp/protocol/openid-connect/logout");
    this.keycloak.logout(); 
  }

async clientId(){
    let profil= await this.keycloak.loadUserProfile();
    return profil.id;
  }

  async clientToken(){
    let profil= await this.keycloak.getToken();
    return profil;
  }

  toggleMenu(){
    console.log("toggleMenu");
    this.navOpen = (this.navOpen==="")?"open-nav":"";
  }


}
