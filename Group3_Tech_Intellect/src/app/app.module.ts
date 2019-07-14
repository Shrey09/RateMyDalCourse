import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DiscussionforumComponent } from './discussionforum/discussionforum.component';
import {ConfirmValidatorDirective} from './registration/confirm-equal-validator.directive';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './lowerCaseUrlSerializer';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { RatingModule } from 'ngx-bootstrap/rating';
// import {LoginValidatorDirective} from './login/login-validator.directive';
// import {EmailValidatorDirective} from './login/login-email-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    EditprofileComponent,
    DiscussionforumComponent,
    ConfirmValidatorDirective,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    RatingModule.forRoot()
  ],
  providers: [
    {
      provide:UrlSerializer,
      useClass:LowerCaseUrlSerializer
    },  AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
