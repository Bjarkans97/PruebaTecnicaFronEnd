# Rick and Morty Web (Angular)

[![CI](https://github.com/Bjarkans97/PruebaTecnicaFronEnd/actions/workflows/ci.yml/badge.svg)](https://github.com/Bjarkans97/PruebaTecnicaFronEnd/actions/workflows/ci.yml)

SPA desarrollada en **Angular 20.3** que muestra episodios y personajes de *Rick and Morty*. Se comunica exclusivamente con un BFF en .NET 8.

> Backend (BFF) que consume esta app: [PruebaTecnicaBackEnd](https://github.com/Bjarkans97/PruebaTecnicaBackEnd)

<!-- Agrega aquí una captura: ![Captura](docs/captura.png) -->

## Funcionalidades

- **Listado paginado de episodios** con estados de carga y errores amigables.
- **Detalle de personajes** de cada episodio, resueltos a través del BFF.
- **Filtros en tiempo real** por nombre y ordenamiento con `computed` signals.
- **Manejo de errores centralizado** con un interceptor HTTP para fallos de red y límites de la API.
- **Diseño responsivo** mobile-first con CSS puro.

## Arquitectura y decisiones técnicas

- **Standalone Components**: arquitectura 100 % modular, sin `NgModule`.
- **Signals API**: estado reactivo (loading, error, data) con `signal` y `computed`.
- **Patrón BFF**: el frontend nunca llama a la API externa directamente; toda la red pasa por el backend.
- **CSS nativo**: Flexbox y Grid, sin frameworks CSS externos.

### Flujo de datos

1. El usuario interactúa con la UI.
2. El componente pide los datos a `RickAndMortyService`.
3. El servicio hace la petición HTTP al BFF.
4. El BFF consulta la API externa y devuelve el objeto tipado.
5. Los Signals actualizan la vista de forma reactiva.

## Tecnologías

- Angular 20.3 (standalone, Signals, SSR)
- TypeScript 5.9 (strict mode)
- HttpClient con interceptores
- Jasmine + Karma para tests

## Cómo ejecutarlo

### Requisitos previos

- Node.js 22 o superior
- Angular CLI 20 (`npm install -g @angular/cli`)
- El [BFF](https://github.com/Bjarkans97/PruebaTecnicaBackEnd) corriendo en `http://localhost:5122`

### Pasos

```bash
git clone https://github.com/Bjarkans97/PruebaTecnicaFronEnd.git
cd PruebaTecnicaFronEnd
npm install
ng serve
```

Abre `http://localhost:4200` en el navegador.

### Otros comandos

```bash
ng build   # compilación de producción
ng test    # tests unitarios
```

## Servicios principales

| Método | Descripción |
| :-- | :-- |
| `getEpisodes(page)` | Listado paginado de episodios |
| `getEpisodioPorId(id)` | Detalle de un episodio |
| `getPersonajesVarios(ids)` | Varios personajes por IDs |
