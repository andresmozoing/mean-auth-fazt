import { Component, OnInit } from '@angular/core';

import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  constructor(private tasksService: TasksService) { }
  
  privateTasks: any[] = [];

  ngOnInit(): void {
    this.tasksService.getPrivateTask().subscribe(
      {
        next: (res)=>{
          console.log(res);
          this.privateTasks= res;
        },
        error: (err)=>{
          console.log(err);
        }
      }
    )
  }

}
