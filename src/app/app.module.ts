import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { ANavbarComponent } from './AdminView/a-navbar/a-navbar.component';
import { UsersTablePanelComponent } from './AdminView/users-table-panel/users-table-panel.component';
import {HttpClientModule} from "@angular/common/http";
import {UserServiceService} from "./Services/user-service.service";
import { GroupsSuggestionComponent } from './post/groups-suggestion/groups-suggestion.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import {FormsModule} from "@angular/forms";
import { CreateCommunityComponent } from './community/create-community/create-community.component';
import { CommunityProfileComponent } from './community/community-profile/community-profile.component';
import { CommunityFollowersComponent } from './community/community-followers/community-followers.component';
import { CommunityGalleryComponent } from './community/community-gallery/community-gallery.component';
import { DasboardComponent } from './AdminView/dasboard/dasboard.component';
import {ReportpostComponent} from "./post/reportpost/reportpost.component";
import {ReportTablePanelComponent} from "./AdminView/report-table-panel/report-table-panel.component";
import { NgChartsModule } from 'ng2-charts';
import { ForgetpassComponent } from './forgetpassword/forgetpass/forgetpass.component';
import { SendforgettpassComponent } from './forgetpassword/sendforgettpass/sendforgettpass.component';
import { HomeComponent } from './home/home.component';
import { LeftSideNavComponent } from './post/left-side-nav/left-side-nav.component';
import {SearchComponent} from "./navbar/search/search.component";
import {ProfileComponent} from "./profile/profile.component";
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { GeneralSettingsComponent } from './profile/editprofile/general-settings/general-settings.component';
import { ChangepasswordComponent } from './profile/editprofile/changepassword/changepassword.component';
import { NotificationComponent } from './navbar/notification/notification.component';
const appRoutes:Routes=[
  {path:'' ,redirectTo:'home2',pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"home",component:NavbarComponent,children:[
      {path:"search/:search",component:SearchComponent},
      { path: '', redirectTo: '', pathMatch: 'full' },
    ]},
  {path:"sendforget",component:SendforgettpassComponent},
  {path:"forgetpass",component:ForgetpassComponent},
  {path:"home2",component:HomeComponent},

  { path: 'reportpost', component: ReportpostComponent },
  {
    path: 'community/:id',
    component: CommunityProfileComponent,
    children: [
      { path: '', redirectTo: 'timeline', pathMatch: 'full' },
      { path: 'timeline', component: PostComponent },
      { path: 'gallery', component: CommunityGalleryComponent,data: { galery: [] } },
      { path: 'followers', component: CommunityFollowersComponent }
    ]
  },
  {path:"adminIndex",component:ANavbarComponent,
    children:[
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path:"dashboard",component:DasboardComponent},
      {path:"tablepanel",component:UsersTablePanelComponent},
      {path:"reportTable",component: ReportTablePanelComponent}
    ]
  },
  {path:'profile/:id',component:ProfileComponent},
  {path:'editprofile/:id',component:EditprofileComponent,children:[
      { path: '', redirectTo: 'generalsettings', pathMatch: 'full' },
      { path: 'generalsettings', component: GeneralSettingsComponent },
      { path: 'changepassword', component: ChangepasswordComponent}
    ]
  },
  {path:"reportPost/:postId",component:ReportpostComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },]
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    PostComponent,
    ANavbarComponent,
    UsersTablePanelComponent,
    GroupsSuggestionComponent,
    CreatePostComponent,
    CreateCommunityComponent,
    CommunityProfileComponent,
    CommunityFollowersComponent,
    CommunityGalleryComponent,
    DasboardComponent,
    ReportpostComponent,
    ForgetpassComponent,
    SendforgettpassComponent,
    HomeComponent,
    LeftSideNavComponent,
    SearchComponent,
    ProfileComponent,
    EditprofileComponent,
    GeneralSettingsComponent,
    ChangepasswordComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReportTablePanelComponent,
    NgChartsModule
  ],
  exports: [RouterModule, NavbarComponent],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
