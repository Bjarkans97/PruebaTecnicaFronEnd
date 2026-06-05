import { Routes } from '@angular/router';
import { EpisodeListComponent } from './components/episode-list/episode-list';
import { CharacterListComponent } from './components/character-list/character-list';

export const routes: Routes = [
  { path: '', component: EpisodeListComponent },
  { path: 'personajes/:ids', component: CharacterListComponent },
];
