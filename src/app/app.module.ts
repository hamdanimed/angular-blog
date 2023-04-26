import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data-service/in-memory-data.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { MyPostsComponent } from './profile-data-sections/my-posts/my-posts.component';
import { LikedPostsComponent } from './profile-data-sections/liked-posts/liked-posts.component';
import { FollowingComponent } from './profile-data-sections/following/following.component';
import { TagsComponent } from './tags/tags.component';
import { PostComponent } from './post/post.component';
import { PostInfoComponent } from './post-info/post-info.component';
import { PostCommentComponent } from './post-comment/post-comment.component';

import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081/',
        realm: 'angularHerosApp',
        clientId: 'blogApp'
      },
      initOptions: {
        // onLoad: 'login-required',
        onLoad: 'login-required',
        // checkLoginIframe: false,
        // silentCheckSsoRedirectUri:window.location.origin + '/assets/verificar-sso.html'
      }
    });
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileCardComponent,
    ProfileDataComponent,
    MyPostsComponent,
    LikedPostsComponent,
    FollowingComponent,
    PostComponent,
    TagsComponent,
    PostInfoComponent,
    PostCommentComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
   ),
   KeycloakAngularModule,
  ],
  providers: [{
    provide:APP_INITIALIZER,
    useFactory:initializeKeycloak,
    multi:true,
    deps:[KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
