import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DiscussionforumComponent } from './discussionforum/discussionforum.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

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
    path: 'register' , component:RegistrationComponent
  },
  {
    path: 'dashboard' , component:DashboardComponent
  },
  {
    path: 'editprofile' , component:EditprofileComponent
  },
  {
    path: 'discussion' , component:DiscussionforumComponent
  },
  {
    path: '**', component:PagenotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
