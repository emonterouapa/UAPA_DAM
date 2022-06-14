// db.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Song } from './song';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  songsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchSongs(): Observable<Song[]> {
    return this.songsList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getSongs();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getSongs(){
    return this.storage.executeSql('SELECT * FROM PF', []).then(res => {
      let items: Song[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            fullname: res.rows.item(i).fullname,  
            email: res.rows.item(i).email,
            enterprise: res.rows.item(i).enterprise,
            cellphone: res.rows.item(i).cellphone,
            namepieza: res.rows.item(i).namepieza,
            material: res.rows.item(i).material,
            cantidad: res.rows.item(i).cantidad,
            datecreation: res.rows.item(i).datecreation,
            ticketstatus: res.rows.item(i).ticketstatus,
            ticketgestor: res.rows.item(i).ticketgestor
           });
        }
      }
      this.songsList.next(items);
    });
  }

  // Add
  addSong(fullname, email, enterprise, cellphone, namepieza, material, cantidad) {
    let data = [fullname, email, enterprise, cellphone, namepieza, material, cantidad];
    return this.storage.executeSql('INSERT INTO PF (fullname, email, enterprise, cellphone, namepieza, material, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
    .then(res => {
      this.getSongs();
    });
  }
 
  // Get single object
  getSong(id): Promise<Song> {
    return this.storage.executeSql('SELECT * FROM PF WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        fullname: res.rows.item(0).fullname,  
        email: res.rows.item(0).email,
        enterprise: res.rows.item(0).enterprise,
        cellphone: res.rows.item(0).cellphone,
        namepieza: res.rows.item(0).namepieza,
        material: res.rows.item(0).material,
        cantidad: res.rows.item(0).cantidad,
        datecreation: res.rows.item(0).datecreation,
        ticketstatus: res.rows.item(0).ticketstatus,
        ticketgestor: res.rows.item(0).ticketgestor
      }
    });
  }

  // Update
  updateSong(id, song: Song) {
    let data = [song.fullname, song.email, song.enterprise, song.cellphone, song.namepieza, song.material, song.cantidad, song.datecreation, song.ticketstatus, song.ticketgestor];
    return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getSongs();
    })
  }

  // Delete
  deleteSong(id) {
    return this.storage.executeSql('DELETE FROM PF WHERE id = ?', [id])
    .then(_ => {
      this.getSongs();
    });
  }
}