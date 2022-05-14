import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importo los componentes
import { TasksComponent } from './components/tasks/tasks.component'; 
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

import { AuthGuard } from './auth.guard';

//Vamos a "crear urls" para que cuando se visite esa ruta, se renderize tal componente
const routes: Routes = [
  {
    path: '', //Ruta por defecto
    redirectTo: '/tasks',
    pathMatch: 'full' //Uso esto para q funcione
  },
  {
    path: 'tasks',
    component : TasksComponent
  },
  {
    path: 'private',
    component: PrivateTasksComponent,
    canActivate: [AuthGuard] //Agrego esto del AuthGuard para que lo verifique cuando quieras acceder a esta vista
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
