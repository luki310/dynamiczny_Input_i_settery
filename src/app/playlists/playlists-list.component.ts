import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "playlists-list",
  template: `
    <table class="table table-striped">
      <thead>
        <tr>
          <th> # </th>
          <th> Nazwa </th>
          <th> Utworów </th>
          <th> Ulubiona </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let playlist of playlists; let i = index" class="playlist-row"
          [ngClass]="{'table-active': selected == playlist}"
          [ngStyle]="{
            borderBottomColor:playlist.color,
            color: ( playlistHover?.id == playlist.id? playlist.color : 'initial' )
           }"
          (mouseenter)="playlistHover = playlist"
          (mouseleave)="playlistHover = false"
          (click)="select(playlist)">
          <td> {{ i + 1 }}. </td>
          <td> {{ playlist.name }} </td>
          <td> {{ playlist.tracks }} </td>
          <td>
            <label><input type="checkbox" [(ngModel)]="playlist.favourite" (click)="$event.stopPropagation();">
              Ulubiona</label>
          </td>
          <td>
            <span class="remove" (click)="remove(playlist)" >&times;</span>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
    tr > td:last-child {
      cursor: pointer;
    }
    .playlist-row:hover {
      /*font-size: 130%;*/
      font-weight: 600;
    }
    .playlist-row {
        border-bottom: 3px solid transparent;
    }
  `
  ]
})
export class PlaylistsListComponent implements OnInit {
  playlistHover;

  @Output("selected") onSelected = new EventEmitter();

  @Input() playlists;

  @Input() selected;

  select(playlist) {
    this.onSelected.emit(playlist);
  }

  remove(playlist) {
    let index = this.playlists.findIndex(p => p.id == playlist.id);
    this.playlists.splice(index, 1);
  }

  constructor() {}

  ngOnInit() {}
}
