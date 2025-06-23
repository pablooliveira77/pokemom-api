# 📱 Pokémon Info App

This project is a mobile application built with **Ionic + Angular** that consumes the [PokéAPI](https://pokeapi.co/) to display detailed information about Pokémon, including types, abilities, stats, and physical characteristics.

---

## ✅ Approach

This application was built with a focus on:

- **Responsiveness:** Full support for mobile and tablet screens using `ion-grid`, `ion-col`, and responsive breakpoints.
- **Modularity:** Each page and feature is organized into Angular modules (`NgModules`) following recommended best practices.
- **Public API Integration:** Uses the PokéAPI RESTful service to retrieve live Pokémon data via `HttpClientModule`.
- **Accessibility & UX:** High contrast colors, readable retro-style font (`Press Start 2P`), native Ionic components, and intuitive layout.
- **Thematic Visual Style:** A design inspired by the Pokémon universe, including vibrant colors and references to classic GBA-era games.

---

## 🎨 Code Style

The project follows standard **Angular coding practices** with Ionic-specific enhancements:

- **Component-based architecture:** Cards, lists, and badges are reused across views as Angular components.
- **Pipes:** Native Angular pipes like `titlecase` are used for text formatting.
- **Async Data Handling:** API requests are made via `HttpClient` and handled with `subscribe()` inside `ngOnInit`.
- **Responsive Design:** Uses Ionic’s built-in grid system to adapt layout across breakpoints (`size`, `size-sm`, `size-md`).
- **Scoped Styling:** Each page component has its own `.page.scss` for modular and isolated styling.

Example:
```ts
<ion-col size="12" size-sm="6" size-md="4">
  <strong>{{ stats.name }}</strong>: {{ stats.base_stat }}
</ion-col>
```


---

# 📱 Pokémon Info App

Este projeto é um aplicativo construído com **Ionic + Angular** que consome a [PokéAPI](https://pokeapi.co/) para exibir informações detalhadas sobre Pokémons, como tipos, habilidades, estatísticas e características físicas.

---

## ✅ Abordagem

A aplicação foi desenvolvida com foco em:

- **Responsividade:** Suporte completo para dispositivos móveis e tablets, com `ion-grid`, `ion-col` e breakpoints customizados.
- **Modularidade:** Cada página e funcionalidade foi separada em módulos (`NgModules`), seguindo a estrutura recomendada do Angular.
- **Integração com API pública:** Utilização da PokéAPI RESTful para obter dados em tempo real de Pokémons via `HttpClientModule`.
- **Acessibilidade e UX:** Cores contrastantes, fonte legível no estilo retrô (Press Start 2P), ícones nativos do Ionic e layout intuitivo.
- **Estética temática:** Estilização inspirada no universo Pokémon, utilizando cores da franquia e referências aos jogos da era GBA.

---

## 🎨 Estilo de Codificação

O projeto segue as convenções padrão do **Angular** com algumas adaptações para Ionic:

- **Componentização:** Reutilização de elementos como cards, listas e badges com base no Angular Components.
- **Pipes:** Uso de pipes nativos como `titlecase` para padronizar textos.
- **Async & Observables:** Uso do `ngOnInit` e `HttpClient` para chamadas assíncronas com `subscribe`.
- **Responsividade:** Utilização dos breakpoints do `ion-grid` para adaptar layout por tamanho de tela (`size`, `size-sm`, `size-md`).
- **CSS Modular:** Estilizações feitas em arquivos `.page.scss` por componente, mantendo isolamento de estilos.

Exemplo:
```ts
<ion-col size="12" size-sm="6" size-md="4">
  <strong>{{ stats.name }}</strong>: {{ stats.base_stat }}
</ion-col>
