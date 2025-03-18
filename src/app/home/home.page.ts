import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTaskPage } from '../modals/add-task/add-task.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone : false
})
export class HomePage {
  constructor(private modalCtrl: ModalController) {}

  async openAddTaskModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage
    });
    return await modal.present();
  }
}
