import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { RickAndMortyService } from '../../services/rick-and-morty';
import { Episode } from '../../models/episode.model';
import { Router } from '@angular/router';
import { ErrorDisplayComponent } from '../error-display/error-display';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [ErrorDisplayComponent],
  templateUrl: './episode-list.html',
  styleUrl: './episode-list.css',
})
export class EpisodeListComponent implements OnInit {
  private service = inject(RickAndMortyService);
  private router = inject(Router);

  private state = signal({
    episodes: [] as Episode[],
    loading: false,
    errorMessage: null as string | null,
    currentPage: 1,
    filterName: '',
    sortBy: 'name' as 'name' | 'date',
  });

  displayEpisodes = computed(() => this.state().episodes);
  loading = computed(() => this.state().loading);
  errorMessage = computed(() => this.state().errorMessage);
  currentPage = computed(() => this.state().currentPage);

  filteredEpisodes = computed(() => {
    let list = [...this.displayEpisodes()];
    const name = this.state().filterName.toLowerCase();

    if (name) list = list.filter((e) => e.name.toLowerCase().includes(name));

    return list.sort((a, b) =>
      this.state().sortBy === 'name'
        ? a.name.localeCompare(b.name)
        : new Date(a.airDate).getTime() - new Date(b.airDate).getTime(),
    );
  });

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(id?: string) {
    this.state.update((s) => ({ ...s, loading: true, errorMessage: null }));

    const request$ = (
      id ? this.service.getEpisodioPorId(id) : this.service.getEpisodes(this.state().currentPage)
    ) as import('rxjs').Observable<any>;

    request$.subscribe({
      next: (data: any) => {
        const episodes = Array.isArray(data) ? data : [data];
        this.state.update((s) => ({ ...s, episodes, loading: false }));
      },
      error: (err: any) => {
        const msg = err?.message?.includes('404')
          ? 'Has llegado al final de la lista.'
          : 'Error inesperado.';
        this.state.update((s) => ({ ...s, errorMessage: msg, loading: false }));
      },
    });
  }

  changePage(delta: number) {
    const newPage = Math.max(1, this.state().currentPage + delta);
    this.state.update((s) => ({ ...s, currentPage: newPage }));
    this.fetchData();
  }

  cargarDetalleEpisodio(id: string) {
    if (!id) return this.limpiar();
    this.fetchData(id);
  }

  updateFilter(filterName: string) {
    this.state.update((s) => ({ ...s, filterName }));
  }
  updateSort(sortBy: 'name' | 'date') {
    this.state.update((s) => ({ ...s, sortBy }));
  }

  limpiar() {
    this.state.update((s) => ({ ...s, currentPage: 1, filterName: '', sortBy: 'name' }));
    this.fetchData();
  }

  verDetalle(ids: string) {
    this.router.navigate(['/personajes', ids]);
  }
}
