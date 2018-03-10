import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService) {
    this.toDoListArray = [];
  }

  ngOnInit() {
    this.toDoService.getTodoList().snapshotChanges().subscribe(items => {
      this.toDoListArray = items.map(item => {
        return {
          key: item.key,
          data: item.payload.toJSON()
        }
      });
    });
  }

  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    // itemTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUncheckTitle($key, !isChecked);
  }
  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }
}
