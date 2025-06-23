import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private FAVORITE_KEY = 'favorite_pokemons';

  getFavorites(): number[] {
    const data = localStorage.getItem(this.FAVORITE_KEY);
    return data ? JSON.parse(data) : [];
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().includes(id);
  }

  toggleFavorite(id: number) {
    const favorites = this.getFavorites();
    if (favorites.includes(id)) {
      const updated = favorites.filter((f) => f !== id);
      localStorage.setItem(this.FAVORITE_KEY, JSON.stringify(updated));
    } else {
      favorites.push(id);
      localStorage.setItem(this.FAVORITE_KEY, JSON.stringify(favorites));
    }
  }
}
