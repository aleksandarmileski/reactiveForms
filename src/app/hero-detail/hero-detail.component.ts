import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';

import {states, Address} from '../data-model';

@Component({
  moduleId: module.id,
  selector: 'rf-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // heroForm = new FormGroup({
  //   name: new FormControl()
  // });

  heroForm: FormGroup;
  states = states;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required], //FormControl called name
      address: this.fb.group(new Address()),
      power: '',
      sidekick: ''
    });
  }


}
