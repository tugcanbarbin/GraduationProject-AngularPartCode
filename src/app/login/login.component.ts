import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServiceService } from '../account-service.service';
import { FirebaseApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { firebaseAppFactory } from '@angular/fire/app/app.module';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFireModule } from "@angular/fire/compat";
import firebase from 'firebase/compat/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterServiceService} from "../register-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //userData: Observable<firebase.default.User>;
  response ="";


  loginForm!: FormGroup;
  constructor(private http: HttpClient,
     private angularFireAuth: AngularFireAuth, 
     private angularFireModule: AngularFireModule,
      private router: Router,
       private activadeRoute: ActivatedRoute,
       private registerService : RegisterServiceService,
       ) {}
  
  ngOnInit(): void {
    this.registerService.updateCurrentMessage("");

    this.registerService.currentResponseMessage.subscribe(msg => this.response = msg);

    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.SignIn(this.loginForm.value["username"],this.loginForm.value["password"]);
  }
  onSubmit2() {
    this.GoogleAuth()
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  private popupLogin = 'https://ens491slm.herokuapp.com/login/';//'https://ens491slm.herokuapp.com/login/';
  private passLogin = 'https://ens491slm.herokuapp.com/apasslogin';//'https://ens491slm.herokuapp.com/login/';

  AuthLogin(provider:any) {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
    };
    return this.angularFireAuth
    .signInWithPopup(provider)
    .then(res => {
      this.http.post(this.popupLogin, res, {headers: httpOptions.headers}).subscribe(
        res2 => {
          console.log(res2);
          var res3 = JSON.parse(JSON.stringify(res2));
          if (res3["Res"] == "Admin Logged In"){
            this.router.navigateByUrl('/map')
          }
        },
        err => {
          try {
            //console.log(res3['Res']);
            var res3 = JSON.parse(JSON.stringify(err));
            console.log(res3['error']['Res'] + "  error message");
            if (res3['error']['Res'] != 'Admin is not exist'){
              this.router.navigateByUrl('/map')
            }
            else {
              this.registerService.updateCurrentMessage(JSON.stringify(res));
              this.angularFireAuth.signOut();
              this.router.navigateByUrl('/register')
            }
          } catch (e) {
            console.log(e);
          }
        }
      )
    })
    }

  SignIn(email:any, password:any) {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
    };
    var res;
    res = {'username': email, 'password': password};
    return this.http.post(this.passLogin, res, {headers: httpOptions.headers}).subscribe(
      res2 => {
        console.log(JSON.stringify(res2) + " asdasdasd");
        var res3 = JSON.parse(JSON.stringify(res2));
        console.log(res3);
        console.log(res3["res"]);
        if (res3["res"] == "user logged in with password"){
          console.log("girdik")
          this.router.navigateByUrl('/map')
        }
      },
      err => {
        try {
          //console.log(res3['Res']);
          var res3 = JSON.parse(JSON.stringify(err));
          console.log(res3['error']['Res'] + "  error message");
          if (res3['error']['Res'] != 'Admin is not exist'){
            this.router.navigateByUrl('/map')
          }
          else {
            this.router.navigateByUrl('/register')
          }
        } catch (e) {
          console.log(e);
        }
      }
    )
  }
}
