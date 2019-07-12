import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import {RatingService} from '../rating.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-discussionforum',
  templateUrl: './discussionforum.component.html',
  styleUrls: ['./discussionforum.component.css']
})
export class DiscussionforumComponent implements OnInit {
  public id: string;
  public finalrate;
  constructor(
    private route: ActivatedRoute,public authenticationService: AuthenticationService, public ratingService : RatingService,
  ) {
  }

  RatingList : any[];
  rate : any[];
  ngOnInit() {
    this.authenticationService.authenticate();
    this.id = this.route.snapshot.paramMap.get('id');

    this.ratingService.displayrating(this.id).subscribe(
      data =>{
        console.log("Ratings displayed ");
        console.log(data["Ratecourses"]);
        this.RatingList = data["Ratecourses"];
        console.log(this.RatingList.length)

        var i;
        var calculate = 0;
        var listsize =this.RatingList.length;
        for(i = 0; i < this.RatingList.length; i++){
          console.log(this.RatingList[i]['Rate']);
          calculate= calculate + this.RatingList[i]['Rate'];
          
        }
        console.log(calculate);
        this.finalrate= (calculate/listsize).toFixed(1);
        console.log(this.finalrate);
      },
      error=>{
        console.log("error in connecting to the server service",error)
      });
  }

  

 
    
  }


