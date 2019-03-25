import { Character } from './../models/models';
import { Component, OnInit, Input } from '@angular/core';
import { CharacterBuilder } from '../models/character-builder';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() character: Character = CharacterBuilder.build();

  constructor() { }

  ngOnInit() {
  }

}
