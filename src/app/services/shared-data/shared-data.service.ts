import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  user = [
    {
      name: "",
      email: "",
      password: ""
    }
  ]
  outputMessage = "" 
}
