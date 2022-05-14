import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor( private tasksService : TasksService ) { }
  
  tasks: any[] = [];

  
  ngOnInit(): void {
    this.tasksService.getTask().subscribe(
      {
        next: (res)=>{
          console.log(res);
          this.tasks=res;
        },
        error: (err)=>{
          console.log(err);
        } 
                
      }
    )  
  }


}
