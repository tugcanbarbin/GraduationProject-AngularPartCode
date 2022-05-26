import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { AngularFireAuthGuard, canActivate, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/compat/auth-guard';
import { RegisterComponent } from './register/register.component';
import { EventListComponent } from './event-list/event-list.component';
import { EditEventComponent } from './edit-event/edit-event.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path:'',
    redirectTo: '/map',
    pathMatch: 'full',

  },
  {
    path:'login',
    component: LoginComponent,

  },
  {
    path:'map',
    component: MapComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin }

  },
  {
    path:'register',
    component: RegisterComponent,
    
  },
  {
    path: 'eventList',
    component: EventListComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe:redirectUnauthorizedToLogin}
  },
  {
    path: 'editEvent/:id',
    component: EditEventComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe:redirectUnauthorizedToLogin}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }