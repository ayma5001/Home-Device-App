import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AppareilService {

 appareilsSubject = new Subject<any[]>();

   private appareils = [



    ];



  constructor(private httpClient: HttpClient) { }



  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }
  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

switchOnAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'On';
    }
    this.emitAppareilSubject();
}

switchOffAll() {
    for(let appareil of this.appareils) {
      appareil.status = 'Off';
      this.emitAppareilSubject();
    }
}

switchOnOne (index:number) {
  this.appareils[index].status = 'On';
  this.emitAppareilSubject();
}

switchOffOne (index:number) {
    this.appareils[index].status = 'Off';
    this.emitAppareilSubject();
}


addAppareil(name: string, status: string) {
  const appareilObject = {
    id: 0,
    name: '',
    status: ''
  };
  appareilObject.name = name;
  appareilObject.status = status;
  appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
  this.appareils.push(appareilObject);
  this.emitAppareilSubject();
}

saveAppareilsToServer() {
  this.httpClient
    .put('https://mahmoud-home-device-app-default-rtdb.firebaseio.com/appareils.json', this.appareils)

    .subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
}

getAppareilsFromServer() {
  this.httpClient
    .get<any[]>('https://mahmoud-home-device-app-default-rtdb.firebaseio.com/appareils.json')
    .subscribe(
      (response) => {
        this.appareils = response;
        this.emitAppareilSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
}

}





