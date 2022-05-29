import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { AngularFireAuthGuard, canActivate, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/compat/auth-guard';
import { RegisterComponent } from './register/register.component';
import { EventListComponent } from './event-list/event-list.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import {CanActivate} from '@angular/router';

import { CancelEventArgs } from 'igniteui-angular-core';
var httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  // headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
};

class UserToken {}
@Injectable()
export class CanActivateTeam implements CanActivate {
  constructor(private http: HttpClient) {}

  canActivate()
  {
    var x = true;
    this.http.post("https://ens491slm.herokuapp.com/isAdminLoggedIn", "", {headers: httpOptions.headers}).subscribe(res => {
      var resparsed= JSON.parse(JSON.stringify(res));
      console.log(resparsed + "routing")
      if(resparsed["res"] == "logged in user")
      {
         x = true;
      }
      else
        x = false;

    });
    return x;
  }
}

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path:'',
    redirectTo: '/login',
    pathMatch: 'full',

  },
  {
    path:'login',
    component: LoginComponent,

  },
  {
    path:'map',
    component: MapComponent,
    canActivate: [CanActivateTeam],
    // data:{ authGuardPipe:redirectUnauthorizedToLogin}

  },
  {
    path:'register',
    component: RegisterComponent,
    
  },
  {
    path: 'eventList',
    component: EventListComponent,
    canActivate: [CanActivateTeam],
    // data:{ authGuardPipe:redirectUnauthorizedToLogin}
  },
  {
    path: 'editEvent/:id',
    component: EditEventComponent,
    canActivate: [CanActivateTeam],
    // data:{ authGuardPipe:redirectUnauthorizedToLogin}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }