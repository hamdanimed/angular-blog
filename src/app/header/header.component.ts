import { Component } from '@angular/core';
import {faHome,faSignOut,faList,faSearch} from '@fortawesome/free-solid-svg-icons'
import { AppComponent } from '../app.component';

import { KeycloakService } from 'keycloak-angular';
import { FirebaseService } from '../services/firebase-service/firebase.service';

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

  username:string="hamdanimed";
  
  constructor(private readonly keycloak: KeycloakService,private firebase:FirebaseService){}
  async ngOnInit(){
    await this.clientId();
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
      // this.username=profil.username?profil.username:"";
      console.log(profil);

      // if(profil.username === profil.email){
      //   let usernameTemp=profil.email?.split('@')[0];

      //   this.firebase.getUsers().subscribe(users=>{
      //     while(users.filter(user=>user['username']===usernameTemp).length !== 0){
      //       let val = Math.floor(1000 + Math.random() * 9000);
      //       usernameTemp=profil.email?.split('@')[0]+String(val);
      //     }
      //     this.username=usernameTemp?usernameTemp:profil.username?profil.username:"";
      //   })

      // }else{
      //   this.username=profil.username?profil.username:"";
      // }

      // let userExist=false;
      const loggedInUser={username:profil.username,email:profil.email};
      let generatedUsername="";
      this.firebase.getUsers().subscribe(users=>{
        
        //if user doesnt exist
        if(users.filter(user=>user.email===loggedInUser.email).length === 0){
          //if user email == user username (logged in with google)
          if(loggedInUser.email===loggedInUser.username){
            generatedUsername=loggedInUser.email?.split('@')[0] as string;
          }
          else{
            generatedUsername=loggedInUser.username as string;
          }
          while(users.filter(user=>user.username===generatedUsername).length !== 0){
            let val=Math.floor(1000 + Math.random() * 9000);
            generatedUsername+=String(val);
          }
          this.username=generatedUsername;
       
          this.firebase.addUser({username:this.username,email:loggedInUser.email}).subscribe(()=>{
            console.log('user was added');
          })
        }
        else{ //if user already exists
          this.username=users.filter(user=>user.email===loggedInUser.email)[0].username;
        }
        console.log('username',this.username)
        this.firebase.user.username=this.username;
      })
      // this.firebase.addUser({username:this.username,email:profil.email}).subscribe(()=>{
      //   console.log('user added');
      // })
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
