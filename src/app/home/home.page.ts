import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FavoriteService } from "src/app/services/favorite.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: false,
})
export class HomePage implements OnInit {
  pokemons: { id: string; nome: string; imagem: string }[] = [];
  favorites: any[] = [];

  pokemonsPorPagina = 6;
  paginaAtual = 1;
  pokemonsExibidos: any[] = [];
  buttonPages = true;

  constructor(
    private favoriteService: FavoriteService,
    private http: HttpClient
  ) {}

  // This method is called when the component is initialized
  // Esse método é chamado quando o componente é inicializado
  ngOnInit(): void {
    this.atualizarPokemonsExibidos();
  }

  // This method updates the displayed Pokémon based on the current page
  // Esse método atualiza os Pokémon exibidos com base na página atual
  async atualizarPokemonsExibidos() {
    const response = await this.buscarApi(
      "https://pokeapi.co/api/v2/pokemon?limit=1302"
    );

    if (response && response.results) {
      this.pokemons = response.results.map((pokemon: any) => ({
        id: pokemon.url.split("/")[6],
        nome: pokemon.name,
        imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemon.url.split("/")[6]
        }.png`,
      }));
    } else {
      console.error("Nenhum Pokémon encontrado.");
      this.pokemons = [];
    }

    const inicio = (this.paginaAtual - 1) * this.pokemonsPorPagina;
    const fim = inicio + this.pokemonsPorPagina;
    this.pokemonsExibidos = this.pokemons.slice(inicio, fim);
  }

  // This method loads the favorite Pokémon and updates pokemonsExibidos
  // Esse método carrega os Pokémon favoritos e atualiza pokemonsExibidos
  async loadFavorites() {
    this.favorites = [];
    this.pokemonsExibidos = [];
    this.buttonPages = false;

    const ids = this.favoriteService.getFavorites();

    try {
      const requests = ids.map((id) =>
        this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).toPromise()
      );

      const results = await Promise.all(requests);
      results.sort((a: any, b: any) => a.id - b.id);

      this.favorites = results.map((data: any) => ({
        id: data.id,
        nome: data.name,
        imagem: data.sprites.front_default,
      }));

      this.pokemonsExibidos = [...this.favorites];
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
      this.favorites = [];
      this.pokemonsExibidos = [];
    }
  }

  // This method loads all Pokémon
  // Esse método carrega todos os Pokémon
  async loadAll() {
    console.log("Carregando todos os Pokémon...");
    this.pokemons = [];
    this.pokemonsExibidos = [];
    this.favorites = []; // Clear favorites as we are loading all Pokémon
    this.paginaAtual = 1; // Reset to the first page
    this.pokemonsPorPagina = 6; // Set to show all Pokémon
    this.buttonPages = true; // Enable pagination buttons when showing all Pokémon // Habilita os botões de paginação ao mostrar todos os Pokémon
    await this.atualizarPokemonsExibidos();
  }

  // This method is called when the user clicks the next page
  // Esse método é chamado quando o usuário clica na próxima página
  proximaPagina() {
    const totalPaginas = Math.ceil(
      this.pokemons.length / this.pokemonsPorPagina
    );
    if (this.paginaAtual < totalPaginas) {
      this.paginaAtual++;
      this.atualizarPokemonsExibidos();
    }
  }

  // This method is called when the user clicks the previous page
  // Esse método é chamado quando o usuário clica na página anterior
  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPokemonsExibidos();
    }
  }

  // This method fetches data from the API
  // Esse método busca dados da API
  async buscarApi(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro:", error);
      return null;
    }
  }
}