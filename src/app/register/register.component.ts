import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat/firebase.app.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth, private angularFireModule: AngularFireModule, private router: Router, private activadeRoute: ActivatedRoute) { }
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = new FormGroup({
      credential: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      
    })
  }
  onSubmit() {
    //this.GoogleAuth()
    //this.SignUp(this.registerForm.value["credential"],this.registerForm.value["password"]);
  }

 // SignUp(credential:any, password:any,) {
    //return this.angularFireAuth.sign(credential, password)
      //.then((result) => {
        //this.router.navigateByUrl('/map')
     // }).catch((error) => {
       // window.alert(error.message)
      //})
  //}

}
