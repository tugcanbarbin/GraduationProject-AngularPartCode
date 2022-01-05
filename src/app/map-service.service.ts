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
  private heroesUrl = 'https://ens491slm.herokuapp.com/yukle/';
  negeldi!:String;
  constructor(private http: HttpClient, private router: Router) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' :'Token '+this.mytoken})
  };

  updateHeroStock(values: any){
    return this.http.post<any>(`${this.heroesUrl}`,values).subscribe({
      next: data => {
        console.log("alo")
      },
      error: error => {
          this.negeldi = error.message;
          console.error('There was an error!', error);
      }
  });
  }


  EventFormPost(values: any){
    console.log("girdik")
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
