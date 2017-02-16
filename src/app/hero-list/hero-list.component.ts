import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Hero} from "../data-model";
import {HeroService} from "../hero.service";
import 'rxjs/add/operator/finally'

@Component({
  moduleId: module.id,
  selector: 'rf-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes: Observable<Hero[]>;
  isLoading = false;
  selectedHero: Hero;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
  }

  getHeroes() {
    this.isLoading = true;
    this.heroes = this.heroService.getHeroes()
      .finally(() => this.isLoading = false);
    this.selectedHero = undefined;
  }

  select(hero: Hero) {
    this.selectedHero = hero;
  }

}
