import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { MyPostsComponent } from './profile-data-sections/my-posts/my-posts.component';
import { LikedPostsComponent } from './profile-data-sections/liked-posts/liked-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileCardComponent,
    ProfileDataComponent,
    MyPostsComponent,
    LikedPostsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
