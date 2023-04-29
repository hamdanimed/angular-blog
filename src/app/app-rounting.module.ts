import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyPostsComponent } from './profile-data-sections/my-posts/my-posts.component';
import { LikedPostsComponent } from './profile-data-sections/liked-posts/liked-posts.component';
import { FollowingComponent } from './profile-data-sections/following/following.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostCommentComponent } from './post-comment/post-comment.component';

const routes: Routes=[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomePageComponent},
  {path:'post/:id',component:PostCommentComponent},

  {path:'profile',redirectTo:'profile/1',pathMatch:'full'},
  {path:'profile/:id',component:ProfilePageComponent,children:[
    {path:'',redirectTo:'liked-posts',pathMatch:'full'},
    {path:'my-posts',component:MyPostsComponent},
    {path:'liked-posts',component:LikedPostsComponent},
    {path:'following',component:FollowingComponent}
  ]}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRountingModule { }
