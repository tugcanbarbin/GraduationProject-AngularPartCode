import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule, CanActivateTeam } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { MapComponent } from "./map/map.component";
import { IgxDataChartInteractivityModule } from "igniteui-angular-charts";
import { IgxGeographicMapModule } from "igniteui-angular-maps";
import { HttpClientModule} from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { RegisterComponent } from './register/register.component';
import { EventListComponent } from './event-list/event-list.component';
import { EditEventComponent } from './edit-event/edit-event.component';
const firebaseConfig = {
    apiKey: "AIzaSyDjdXcrAoDRmuFscrdlcYJIEgVK_jNZHDs",
    authDomain: "ens491-6ae91.firebaseapp.com",
    projectId: "ens491-6ae91",
    storageBucket: "ens491-6ae91.appspot.com",
    messagingSenderId: "642604936201",
    appId: "1:642604936201:web:dbb9d7f96d8ace060cdcd8",
    measurementId: "G-GWRVQGDTM7"
  };

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MapComponent,
        RegisterComponent,
        EventListComponent,
        EditEventComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        IgxDataChartInteractivityModule,
        IgxGeographicMapModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
    ],
    providers: [
    ScreenTrackingService,UserTrackingService,
    CanActivateTeam
  ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
