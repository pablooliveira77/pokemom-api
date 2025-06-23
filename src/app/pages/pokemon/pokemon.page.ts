import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FavoriteService } from "src/app/services/favorite.service";

@Component({
  selector: "app-pokemon",
  templateUrl: "./pokemon.page.html",
  styleUrls: ["./pokemon.page.scss"],
  standalone: false,
})
export class PokemonPage implements OnInit {
  id: string = "";
  pokemon: {
    id: number;
    name: string;
    image: string;
    type: [name: string];
    abilities: [name: string];
    stats: [{ name: string; base_stats: number }];
    height: number;
    weight: number;
  } | null = null;
  isFav: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private favoriteService: FavoriteService
  ) {}

  // This method is called when the component is initialized
  // Esse método é chamado quando o componente é inicializado
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id") || "";
    this.isFav = this.favoriteService.isFavorite(Number(this.id));
    this.buscarPokemon();
  }

  // This method toggles the favorite status of the Pokémon
  // Esse método alterna o status de favorito do Pokémon
  toggleFavorite() {
    if (this.pokemon) {
      this.favoriteService.toggleFavorite(this.pokemon.id);
      this.isFav = !this.isFav;
    }
  }

  // This method fetches the Pokémon data from the API
  // Esse método busca os dados do Pokémon na API
  async buscarPokemon() {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
    const pokemonData = await this.buscarApi(url);
    if (pokemonData) {
      // Here we format the Pokémon data
      // Aqui formatamos os dados do Pokémon
      this.pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
        type: pokemonData.types.map((type: any) => type.type.name),
        abilities: pokemonData.abilities.map(
          (ability: any) => ability.ability.name
        ),
        stats: pokemonData.stats.map((stat: any) => ({
          name: stat.stat.name,
          base_stats: stat.base_stat,
        })),
        height: pokemonData.height * 10, // Converting from decimetres to centimetres // Convertendo de decímetros para centímetros
        weight: pokemonData.weight / 10, // Converting from hectograms to kilograms // Convertendo de hectogramas para quilogramas
      };
    } else {
      console.error("Não foi possível buscar os dados do Pokémon");
      this.pokemon = null;
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
