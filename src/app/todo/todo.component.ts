import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getTodoList().snapshotChanges().subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        //var x = element.payload.toJSON();
        // item = {...element.payload.toJSON(), item: element.key};
        // this.toDoListArray.push(element.payload.toJSON());
        this.toDoListArray.push(element.payload.toJSON());
      })
      console.log(this.toDoListArray);
    });

  }

  onAdd(itemTitle){
      this.toDoService.addTitle(itemTitle.value);
      itemTitle.value = null;
  }
  alterCheck($key: string, isChecked){
    this.toDoService.checkOrUncheckTitle($key, !isChecked);
  }
  onDelete( $key :string){
    this.toDoService.removeTitle($key);
    console.log(this.toDoListArray);
  }
}
 