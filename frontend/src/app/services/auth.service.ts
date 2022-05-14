import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private URL = 'http://localhost:3000/api' //url del server

  constructor(private http:HttpClient, private router : Router) 
  { 

  }

  signUp(user:any){ //Este signup hara la peticion a nuestro server de node
    return this.http.post<any>(this.URL + '/signup', user);

        //El metodo .post me devuelve un observable, lo q hago aca es
        // retornarlo para poder manejarlo en los componentes q lo utilizen
  }

  signIn(user:any){
    return this.http.post<any>(this.URL + '/signin', user);
  }

  //voy a hacer un metodo para comprobar si el usuario esta logueado o no
  loggedIn(){
    return !!localStorage.getItem('token');
    //con los dos !! lo q haces es decir "devolveme un booleano", va a retornar true o false, no va a retornar el item
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
