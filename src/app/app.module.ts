import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data-service/in-memory-data.service';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { MyPostsComponent } from './profile-data-sections/my-posts/my-posts.component';
import { LikedPostsComponent } from './profile-data-sections/liked-posts/liked-posts.component';
import { FollowingComponent } from './profile-data-sections/following/following.component';
import { TagsComponent } from './tags/tags.component';
import { HomeFiltersComponent } from './home-filters/home-filters.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostCommentComponent } from './post-comment/post-comment.component';

import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TruncatePipe } from './pipe/truncatePipe';
import { PostModalComponent } from './post-modal/post-modal.component';
import { environment } from '../environments/environment';

import { initializeApp } from '@angular/fire/app';
import { provideFirebaseApp } from '@angular/fire/app';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081/',
        realm: 'pfsrealm',
        clientId: 'blog-app'
      },
      initOptions: {
        onLoad: 'login-required',
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
    HomeFiltersComponent,
    TagsComponent,
    PostCardComponent,
    PostCommentComponent,
    ProfilePageComponent,
    HomePageComponent,
    TruncatePipe,
    PostModalComponent,
    PagenotfoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
   ),
   KeycloakAngularModule,
   AppRoutingModule,
  //  AngularFireModule.initializeApp(environment.firebase),
  //  AngularFirestoreModule, // for firestore
  //  AngularFireDatabaseModule,
   provideFirebaseApp(() => initializeApp(environment.firebase)),
   provideFirestore(() => getFirestore()),
   provideStorage(() => getStorage()),
  ],
  providers: [
    {
      provide:APP_INITIALIZER,
      useFactory:initializeKeycloak,
      multi:true,
      deps:[KeycloakService]
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
