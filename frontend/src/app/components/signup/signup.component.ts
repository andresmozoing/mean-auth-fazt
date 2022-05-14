import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
//importo el authservice apra poder usar los metodos de este y comunicarme con el server del back
import { Router } from '@angular/router';
//importo este modulo para poder redireccionar a otra pagina

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
}) 
export class SignupComponent implements OnInit {

  user = { email:'' , password: ''  }

  constructor( private authService : AuthService, private router:Router) 
                //Hago una instancia de la clase AuthService y Router para poder usarlas
  { 

  }


  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUp(this.user)
      .subscribe({ //Cuando se realize un cambio en el observable(en el signUp), 
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token); //Guardo el token en el localStorage para no perderlo
          this.router.navigate(['/private']);
        }
        ,
        error: (err) => {
          console.log(err);
        }
      }
    )
    console.log(this.user);
  }
}
