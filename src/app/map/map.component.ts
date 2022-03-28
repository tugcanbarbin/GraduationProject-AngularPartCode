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
declare const L : any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('inputRow') formRow!: ElementRef;
  loginForm!: FormGroup;
  constructor(private angularFireAuth: AngularFireAuth, private angularFireModule: AngularFireModule,private mapService:MapServiceService,private renderer:Renderer2, private router: Router, private activadeRoute: ActivatedRoute, private formBuilder: FormBuilder) { }
  map:any;
  mapPopup:any
  divName:any;
  ngOnInit(): void {
    this.map = L.map('map').setView([40.891429, 29.379494], 17);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHVnY2FuYmFyYmluIiwiYSI6ImNrd3oyMjRlbDAxODgybm81cGNod29ibjUifQ.yxBa7sIXhz0I1mDgIw8SEA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 19,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
    }).addTo(this.map);
    // this.mapPopup = L.popup();
    this.map.on('click', this.onMapClick,this);
    this.createForm()
  }
  // ngAfterViewInit() 
  // {
  // }
  onMapClick(e:any)
  {
    //  this.mapPopup.setLatLng(e.latlng)
    // .setContent("You Clicked the map at"+ e.latlng.toString())
    // .openOn(this.map);

    var marker = new L.Marker(e.latlng);
    marker.bindPopup("Event Position : " + e.latlng.toString()).openPopup();
    marker.addTo(this.map);

    this.Photos.push(this.formBuilder.group({photo:''}))
    this.Locations.push(this.formBuilder.group({location:e.latlng.toString()}))


  }
  onSubmit()
  {
    this.loginForm.value["adminId"] = 25168
    this.loginForm.value["adminName"] = "tugcanBarbin"
    var mVersion = {
      'adminId': this.loginForm.value['adminId'],
      'adminName': this.loginForm.value['adminName'],
      'eDate': this.loginForm.value['eDate'],
      'eventDescription': this.loginForm.value['eventDescription'],
      'eventName': this.loginForm.value['eventName'],
      'locations': this.loginForm.value['locations'],
      'maxGroupSize': this.loginForm.value['maxGroupSize'],
      'maxPlayerSize':this.loginForm.value['maxPlayerSize'],
      'photos': this.loginForm.value['photos'],
      'sDate': this.loginForm.value['sDate']
    }
    var json = serialize(mVersion);
    this.mapService.CreateEvent(json)

  }
  createForm()
  {
    this.loginForm = new FormGroup({
     // adminId: new FormControl(''),
      eventName: new FormControl('', Validators.required),
      eventDescription: new FormControl('', Validators.required),
      maxGroupSize:new FormControl('', Validators.required),
      maxPlayerSize:new FormControl('', Validators.required),
      sDate: new FormControl('', Validators.required),
      eDate: new FormControl('', Validators.required),
      photos: this.formBuilder.array([this.addPhotoFormGroup()]),
      locations: this.formBuilder.array([this.addLocationFormGroup()])
    });
  }
  get Photos()
  {
    return this.loginForm.get('photos') as FormArray;
  }
  get Locations()
  {
    return this.loginForm.get('locations') as FormArray;
  }
  addPhotoFormGroup()
  {
    return this.formBuilder.group(
      {
        photo: [''],
      }
    );

  }
  addLocationFormGroup()
  {
    return this.formBuilder.group(
      {
        location: [''],
      }
    );

  }

  Logout()
  {
    return this.angularFireAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
      //window.alert('Logged out!');

    });

  }


}
