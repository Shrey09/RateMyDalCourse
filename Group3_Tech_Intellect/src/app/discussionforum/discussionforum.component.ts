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

  // list to store overall rating and individual rating
  RatingList : any[];
  rate : any[];
  ngOnInit() {
    this.authenticationService.authenticate();
    // fetch the course code which is passed from the service
    this.id = this.route.snapshot.paramMap.get('id');

    // subscribe the ratingservice by passing the courseid
    this.ratingService.displayrating(this.id).subscribe(
      data =>{        
        this.RatingList = data["Ratecourses"];
        
        // Logic to Calculate Overall rating
        // https://stackoverflow.com/questions/15496508/how-to-iterate-object-in-javascript
        var calculate = 0;
        var listsize =this.RatingList.length;
        for(var i = 0; i < this.RatingList.length; i++){
          
          calculate= calculate + this.RatingList[i]['Rate'];
          
          
        } 

        // Dispaly the message when there is no ratings present
       /* if(isNaN(this.finalrate))
        {
          this.finalrate='No Ratings Available';
          console.log("deep");
        }
        // Round off overall rating to one decimal point 
        else{*/
          this.finalrate = (calculate/listsize).toFixed(1);   
          console.log("Meet"); 
       // }     
           
      },
      error=>{
        // Error Message when connection with server
        console.log("error in connecting to the server service",error)
      });
  }

  

 
    
  }


