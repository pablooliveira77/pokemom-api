import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: false,
})
export class HomePage implements OnInit {
  pokemons: { id: string; nome: string; imagem: string }[] = [];

  pokemonsPorPagina = 6;
  paginaAtual = 1;
  pokemonsExibidos: any[] = [];

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
}
