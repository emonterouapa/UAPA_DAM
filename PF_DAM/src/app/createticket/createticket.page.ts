import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";


@Component({
  selector: 'app-createticket',
  templateUrl: './createticket.page.html',
  styleUrls: ['./createticket.page.scss'],
})
export class CreateticketPage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = []

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchSongs().subscribe(item => {
          this.Data = item
        })
      }
    });

    this.mainForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      enterprise: [''],
      cellphone: [''],
      namepieza: [''],
      material: [''],
      cantidad: [''],
      datecreation: [''],
      ticketstatus: [''],
      ticketgestor: ['']
    })
  }

  storeData() {
    this.db.addSong(
      this.mainForm.value.fullname,
      this.mainForm.value.email,
      this.mainForm.value.enterprise,
      this.mainForm.value.cellphone,
      this.mainForm.value.namepieza,
      this.mainForm.value.material,
      this.mainForm.value.cantidad
    ).then((res) => {
      this.mainForm.reset();
    })
    
  }

  deleteSong(id){
    this.db.deleteSong(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Ticket Deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
   
}