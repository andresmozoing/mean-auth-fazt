import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor( private authService : AuthService, private router : Router) { }

  user = { email: '' , password : ''}

  ngOnInit(): void {
  }

  signIn(){
    this.authService.signIn(this.user)
    .subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token',res.token); //guardo el token en el local storage
        this.router.navigate(['/private']); //me muevo a private
      },
      error: (err) => {
        console.log(err);
      }
    }
    )
  }
}
