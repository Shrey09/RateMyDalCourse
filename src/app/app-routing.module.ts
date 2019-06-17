import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DiscussionforumComponent } from './discussionforum/discussionforum.component';

const routes: Routes = [

  {
    path: '', component:HomepageComponent
  }, 
  {
    path: 'home', component:HomepageComponent
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'Register' , component:RegistrationComponent
  },
  {
    path: 'dashboard' , component:DashboardComponent
  },
  {
    path: 'editProfile' , component:EditprofileComponent
  },
  {
    path: 'discussion' , component:DiscussionforumComponent
  },
  {
    path: '**', component:HomepageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
