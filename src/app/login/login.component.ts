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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //userData: Observable<firebase.default.User>;
  
  loginForm!: FormGroup;
  constructor(private angularFireAuth: AngularFireAuth, private angularFireModule: AngularFireModule, private router: Router, private activadeRoute: ActivatedRoute, ) {}
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
  AuthLogin(provider:any) {
    return this.angularFireAuth
    .signInWithPopup(provider)
    .then(res => {
      console.log(res);
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
