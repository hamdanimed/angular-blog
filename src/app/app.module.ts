import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TagsComponent } from './tags/tags.component';
import { PostComponent } from './post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostInfoComponent } from './post-info/post-info.component';




@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    TagsComponent,
    PostInfoComponent,

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
