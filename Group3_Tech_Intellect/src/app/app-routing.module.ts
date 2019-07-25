import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DiscussionforumComponent } from './discussionforum/discussionforum.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {
    path: '', component: HomepageComponent
  },
  {
    path: 'home', component: HomepageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register' , component: RegistrationComponent
  },
  {
    path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'editprofile' , component: EditprofileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'discussion/:id' , component: DiscussionforumComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', component: PagenotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
