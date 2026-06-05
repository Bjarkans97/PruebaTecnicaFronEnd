import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty';
import { Personaje } from '../../models/personaje.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDisplayComponent } from '../error-display/error-display';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [ErrorDisplayComponent],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(RickAndMortyService);
  
  state = signal({
    personajes: [] as Personaje[],
    loading: false,
    errorMessage: null as string | null
  });

  personajes = computed(() => this.state().personajes);
  loading = computed(() => this.state().loading);
  errorMessage = computed(() => this.state().errorMessage);

  ngOnInit() {
    const ids = this.route.snapshot.paramMap.get('ids') || '';
    this.cargarPersonajes(ids);
  }

  cargarPersonajes(ids: string) {
    if (!ids) return;

    this.state.update(s => ({ ...s, loading: true, errorMessage: null }));

    this.service.getPersonajesVarios(ids).subscribe({
      next: (data) => {
        const lista = Array.isArray(data) ? data : [data];
        this.state.update(s => ({ ...s, personajes: lista, loading: false }));
      },
      error: (err) => {
        this.state.update(s => ({ 
          ...s, 
          errorMessage: 'Error al cargar personajes: ' + (err?.message || 'Intente de nuevo'), 
          loading: false 
        }));
      }
    });
  }

  volver() { 
    this.router.navigate(['/']); 
  }
}