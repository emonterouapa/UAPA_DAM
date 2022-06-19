import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from "../shared/authentication-service";
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  verifiedemail: boolean;
  nameshow: string;
  picture: string;
  Data: any[] = []

  constructor(
    private navCtrl: NavController,
    public authService: AuthenticationService,
    private db: DbService,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }
  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.verifiedemail = res.emailVerified;
        this.nameshow = res.displayName;
        this.picture = res.photoURL;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })



    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchSongs().subscribe(item => {
          this.Data = item
        })
      }
    });

  }
}
