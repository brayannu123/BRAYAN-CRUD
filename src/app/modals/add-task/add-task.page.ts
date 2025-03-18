import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../interface/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: false
})
export class AddTaskPage {
  @Input() task: Task = { id: '', title: '', description: '', date: new Date().toISOString(), completed: false };
  @Input() isEditMode = false;

  constructor(private modalCtrl: ModalController, private taskService: TaskService , private toastCtrl: ToastController) {}

  async saveTask() {
    if (!this.task.title.trim()) return;

    try {
      if (this.isEditMode) {
        await this.taskService.updateTask(this.task);
        this.showToast("Tarea actualizada con éxito");
      } else {
        await this.taskService.addTask(this.task);
        this.showToast("Tarea agregada con éxito");
      }
      this.closeModal();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }



}
