import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormArray} from '@angular/forms';

import {states, Address, Hero} from '../data-model';
import {HeroService} from "../hero.service";

@Component({
  moduleId: module.id,
  selector: 'rf-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnChanges {

  // heroForm = new FormGroup({
  //   name: new FormControl()
  // });

  @Input()
  hero: Hero;

  heroForm: FormGroup;
  nameChangeLog: string[] = [];
  states = states;

  constructor(private fb: FormBuilder,
              private heroService: HeroService) {
    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required], //FormControl called name
      address: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name
    });
    this.setAddress(this.hero.addresses);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }

  setAddress(addresses: Address[]) {
    const addressesFGs = addresses.map(address => this.fb.group(address))
    const addressFormArray = this.fb.array(addressesFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }

  onSubmit() {
    this.hero = this.prepareSaveHero();
    this.heroService.updateHero(this.hero)
      .subscribe();
    this.ngOnChanges();
  }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new hero object containing a combination of original hero values
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      addresses: secretLairsDeepCopy
    };
    return saveHero;
  }


  revert() {
    this.ngOnChanges();
  }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    )
  }

}
