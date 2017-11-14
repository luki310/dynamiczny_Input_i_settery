import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: "playlist-form",
  template: `
        <form #formReference="ngForm">
          <div class="form-group">
            <label>Nazwa:</label>
            <input type="text" ngModel name="name" class="form-control">
          </div>
          <div class="form-group">
            <label>Utwory:</label>
            <input type="text" [value]="playlist.tracks + ' utwory'" disabled class="form-control">
          </div>
          <div class="form-group">
            <label>Kolor:</label>
            <input type="color" ngModel name="color">
          </div>
          <div class="form-group">
            <label><input type="checkbox" ngModel name="favourite">
            Ulubiona</label>
          </div>
          <label><input type="checkbox" (change)="hide = !hide">Dodatkowy opis</label>
            <div class="form-group" *ngIf="hide">
              <textarea  class="form-control" rows="3" ngModel name="description"></textarea>
            </div>
          <div class="form-group">
            <button class="btn btn-success float-xs-right"
                    (click)="save(form)">Zapisz</button>
          </div>
        </form>
  `,
  styles: []
})
export class PlaylistFormComponent implements OnInit, AfterViewInit {
  @Input('playlist')
  set setPlaylist(playlist) {
    setTimeout(() => {
      this.form.resetForm(this.playlist)
    })

    this.playlist = playlist;
  }

  playlist
  
  @Output("saved") onSave = new EventEmitter();
  
  save(form) {
    this.onSave.emit({ ...this.playlist, ...form.value });
  }
  
  constructor() {}
  
  ngOnInit() {}
  
  @ViewChild('formReference')
  form: NgForm
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.form.resetForm(this.playlist)
    })
    console.log('ngAfterViewInit', this.form)
  }

}
