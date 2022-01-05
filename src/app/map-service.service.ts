import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router'
import { BehaviorSubject} from 'rxjs';
import { map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  private heroesUrl = 'http://localhost:8000/yukle/';
  negeldi!:String;
  constructor(private http: HttpClient, private router: Router) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
  };

  updateHeroStock(values: any){
    var resp;
    this.http.request('POST', this.heroesUrl, {body:values,headers:this.httpOptions.headers}).subscribe(data => {
      resp= data;
    });
    console.log(resp);
    return resp;
  }


  EventFormPost(values: any){
    console.log("girdik")
    console.log(values['eventName'])
    return this.http.post<any>(this.heroesUrl, values,this.httpOptions).pipe(
      map((user : any)=>{
        console.log("buraya girdik mi")
        if(user){
          console.log("attm galiba")
        }
      })
    )
  }
}
