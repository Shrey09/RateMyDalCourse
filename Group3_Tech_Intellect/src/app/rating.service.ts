import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RatingService {


 

  constructor(private http: HttpClient) {}

    displayrating(id:string) {
     const url = 'http://localhost:3000/displayrating/'+ id;      
       return this.http.get<any>(url);

   }
}
