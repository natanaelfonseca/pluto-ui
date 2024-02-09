import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeEmail: string = "john@fake.com.br"
  fakePwd: string = "123456"

  constructor() { }

  login(email: string, password: string): boolean {
    
    if( email == this.fakeEmail && password == this.fakePwd ){
      return true;
    }

    return false;
  }  

  logout(){
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  }

}
