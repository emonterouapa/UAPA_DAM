import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    

    this.db.getSong(this.id).then(res => {
      this.editForm.setValue({
        fullname: res['fullname'],
        email: res['email'],
        enterprise: res['enterprise'],
        cellphone: res['cellphone'],
        namepieza: res['namepieza'],
        material: res['material'],
        cantidad: res['cantidad']
      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      enterprise:  [''],
      cellphone:  [''],
      namepieza:  [''],
      material:  [''],
      cantidad:  ['']
    })
  }

  saveForm(){
    this.db.updateSong(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/createticket']);
    })
  }

}
