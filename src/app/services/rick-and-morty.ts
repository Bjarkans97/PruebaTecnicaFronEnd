import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../models/personaje.model';
import { Episode } from '../models/episode.model';

@Injectable({ providedIn: 'root' })
export class RickAndMortyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5122/api';

  getEpisodes(page: number = 1): Observable<Episode[]> {
  const url = `${this.apiUrl}/Episodios?page=${page}`;
  console.log('Llamando a la URL:', url);
  return this.http.get<Episode[]>(url);
}

  getEpisodioPorId(id: string): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/Episodios/${id}`);
  }

  getPersonajesVarios(ids: string): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(`${this.apiUrl}/Personajes/list/${ids}`);
  }
}
