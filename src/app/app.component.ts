import { Component , OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/interval';
import { Subscription} from 'rxjs/Subscription'
import { OnDestroy} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy {

  secondes: number;
  counterSubscription: Subscription;

  ngOnInit() {
    //const counter = Observable.interval(1000);
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      }
    );
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}


