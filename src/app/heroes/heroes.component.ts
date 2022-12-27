import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(result => this.heroes = result);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return;}
    const newId = Math.max(...this.heroes.map(hero => hero.id)) + 1
    const newHero:Hero = {'id': newId, 'name': name};
    console.log(newHero);
    this.heroService.addHero(newHero)
    .subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
