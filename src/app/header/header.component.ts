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

  username:string="";
  
  constructor(private readonly keycloak: KeycloakService){}
  ngOnInit(){
    this.clientId();
  }
  
  public endSession() {
    // window.location.replace("http://localhost:8081/realms/angularHerosApp/protocol/openid-connect/logout");
    this.keycloak.logout(); 
  }

  public getUserName(): string{
    this.keycloak.loadUserProfile();
    return this.keycloak.getUsername();
  }

  async clientId(){
      let profil= await this.keycloak.loadUserProfile();
      this.username=profil.username?profil.username:"";
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
