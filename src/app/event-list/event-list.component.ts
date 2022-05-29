import { Component, ElementRef, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MapServiceService} from "../map-service.service"
import {
  serialize
} from 'typescript-json-serializer';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AngularFireModule } from "@angular/fire/compat";
import firebase from 'firebase/compat/app';
import { Event, EventShort } from '../event';
declare const L : any;
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  fieldArray: Array<EventShort> = [];
  private newField: any = {};

  constructor(private angularFireAuth: AngularFireAuth, private angularFireModule: AngularFireModule,private mapService:MapServiceService,private renderer:Renderer2, private router: Router, private activadeRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newField = {eventName: "example event 1", maxGroupSize:"10", maxPlayerSize:"5", startDate: "05.03.2022", dueDate: " 10.03.2022"}
    this.fieldArray.push(this.newField);
    this.addFieldValue();
  }

  Logout()
  {
    return this.angularFireAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
      //window.alert('Logged out!');

    });

  }

  addFieldValue() {
    this.newField = {eventName: "example event 2", maxGroupSize:"12", maxPlayerSize:"3",startDate: "15.03.2022", dueDate: " 23.03.2022"}
    this.fieldArray.push(this.newField);
}

}
