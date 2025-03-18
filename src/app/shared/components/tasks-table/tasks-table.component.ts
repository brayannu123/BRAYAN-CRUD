import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../interface/Task';
import { AddTaskPage } from '../../../modals/add-task/add-task.page';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  standalone: false
})
export class TasksTableComponent implements OnInit {
  tasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService, private modalCtrl: ModalController , private alertCtrl: AlertController ) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  async openTaskModal(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage,
      componentProps: {
        task: task ? { ...task } : { title: '', description: '', date: new Date().toISOString(), completed: false },
        isEditMode: !!task
      }
    });

    await modal.present();
  }

  async confirmDeleteTask(taskId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.taskService.deleteTask(taskId);
              console.log("Tarea eliminada");
            } catch (error) {
              console.error("Error al eliminar la tarea:", error);
            }
          }
        }
      ]
    });

    await alert.present();
  }



}
