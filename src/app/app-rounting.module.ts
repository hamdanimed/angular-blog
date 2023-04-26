import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { AppComponent } from './app.component';

const routes: Routes=[
  // {path:'',redirectTo:'user',pathMatch:'full'},
  // {path:'user',component:ProfileDataComponent},
  {path:'',component:ProfileDataComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRountingModule { }
