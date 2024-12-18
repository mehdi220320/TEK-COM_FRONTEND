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
const appRoutes:Routes=[
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"home",component:NavbarComponent},
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
  {path:"adminIndex",component:ANavbarComponent},
  {path:"dashboard",component:DasboardComponent},
  {path:"tablepanel",component:UsersTablePanelComponent},
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
    ReportpostComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReportTablePanelComponent
  ],
  exports:[RouterModule],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
