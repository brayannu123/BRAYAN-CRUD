import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../../interface/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.tasksCollection = collection(this.firestore, 'TASKS');
  }

  addTask(task: Task): Promise<void> {
    return addDoc(this.tasksCollection, task).then(() => {});
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<Task[]>;
  }


  updateTask(task: Task): Promise<void> {
    const taskDoc = doc(this.firestore, `TASKS/${task.id}`);
    return updateDoc(taskDoc, {
      title: task.title,
      description: task.description,
      date: task.date,
      completed: task.completed
    });
  }

  deleteTask(taskId: string): Promise<void> {
    const taskDoc = doc(this.firestore, `TASKS/${taskId}`);
    return deleteDoc(taskDoc);
  }



}
