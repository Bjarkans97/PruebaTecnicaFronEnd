
FRONTEND: PRUEBA TECNICA FRONTEND


Esta aplicación es una SPA (Single Page Application) desarrollada 
en Angular 20.3, diseñada para interactuar con un BFF 
(Backend for Frontend) que gestiona la información de la serie 
"Rick and Morty".

----------------------------------------------------------------
ARQUITECTURA Y PRINCIPIOS
----------------------------------------------------------------
- Standalone Components: Arquitectura 100% modular, sin NgModule.
- Gestión Reactiva: Uso intensivo de Signals API y 'computed' 
  para un flujo de datos eficiente y sincronizado.
- Patrón BFF: La capa frontend se comunica exclusivamente con 
  el BFF, centralizando la lógica de red.
- CSS Nativo: Diseño Mobile-First utilizando Flexbox y Grid; 
  cero dependencias de frameworks CSS externos.

----------------------------------------------------------------
TECNOLOGÍAS
----------------------------------------------------------------
- Framework: Angular 20.3.x.
- Lenguaje: TypeScript 5.9.3 (Strict Mode).
- Comunicación: HttpClient con interceptores de error.
- Gestión UI: Signals para estados de carga y errores en tiempo real.

----------------------------------------------------------------
CONFIGURACIÓN Y SERVICIOS
----------------------------------------------------------------
Endpoint base: http://localhost:5122/api/

Servicios principales:
- getEpisodes(page): Listado paginado de episodios.
- getEpisodioPorId(id): Búsqueda específica de un episodio.
- getPersonajesVarios(ids): Resolución de personajes vía BFF.

----------------------------------------------------------------
EJECUCIÓN DEL PROYECTO
----------------------------------------------------------------
Versiones utilizadas:
- Node.js (v22.2.3 o superior).
- Angular CLI (v20.3.27)

Comandos:
1. Instalar dependencias: npm install
2. Ejecutar desarrollo: ng serve
3. Compilar producción: ng build

----------------------------------------------------------------
FLUJO DE COMUNICACIÓN (BFF)
----------------------------------------------------------------
1. El usuario interactúa con la UI.
2. El componente solicita datos al RickAndMortyService.
3. El servicio realiza la petición HTTP al servidor BFF (Backend .NET).
4. El BFF procesa la lógica como proxy y retorna el objeto tipado.
5. El Frontend captura el estado (loading, error, data) mediante 
   Signals, actualizando la vista de forma reactiva.

----------------------------------------------------------------
FUNCIONALIDADES IMPLEMENTADAS
----------------------------------------------------------------
- Listado Paginado: Gestión de estados de error amigables.
- Filtros en Tiempo Real: Filtrado por nombre y ordenamiento 
  mediante computed signals.
- Manejo de Errores: Interceptor centralizado para fallos de red 
  y límites de API.
- UI Responsiva: Diseño adaptativo mediante CSS puro.