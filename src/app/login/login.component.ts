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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //userData: Observable<firebase.default.User>;
  
  loginForm!: FormGroup;
  constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth, private angularFireModule: AngularFireModule, private router: Router, private activadeRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    //this.GoogleAuth()
    this.SignIn(this.loginForm.value["username"],this.loginForm.value["password"]);
  }
  onSubmit2() {
    this.GoogleAuth()
    //this.SignIn(this.loginForm.value["username"],this.loginForm.value["password"]);
  }
  // GoogleAuth() {
  //   return this.SignIn(new this.GoogleAuthProvider());
  // }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  private heroesUrl = 'https://ens491slm.herokuapp.com/login/';//'https://ens491slm.herokuapp.com/login/';
  AuthLogin(provider:any) {
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
    };
    return this.angularFireAuth
    .signInWithPopup(provider)
    .then(res => {
      this.http.post(this.heroesUrl, res, {headers: httpOptions.headers}).toPromise()
      .then(
        res2 => {
          console.log(JSON.stringify(res2));
          try {
            var res3 = JSON.parse(JSON.stringify(res2));
            console.log(res3['Res']);
            if (res3['Res'] != 'Admin is not exist'){
              this.router.navigateByUrl('/map')
            }
            else {
              this.router.navigateByUrl('/signup')
            }
          } catch (e) {
            console.log(e)
          }
        }
      )
      //this.router.navigateByUrl('/map')
    })
    .catch(err => {
      
    });
    }
  SignIn(email:any, password:any) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigateByUrl('/map')
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
