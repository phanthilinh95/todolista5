import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class TodoService {
  todoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) {
    this.todoList = this.firebasedb.list('titles');
  }

  getTodoList() {
    // this.todoList = this.firebasedb.list('titles');
    // this.todoList.remove();
    return this.todoList;
  }

  addTitle(title: string) {
    console.log('on add');
    this.todoList.push({
      title: title,
      isChecked: false
    });
  }

  checkOrUncheckTitle($key: string, flag: boolean) {
    console.log('on update');
    this.todoList.update($key, { isChecked: flag });
  }

  removeTitle($key: any) {
    this.todoList.remove($key);
  }
}
