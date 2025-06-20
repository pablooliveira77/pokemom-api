import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PokemonPage } from "./pokemon.page";

const routes: Routes = [
  {
    path: ":id",
    component: PokemonPage,
  },
  {
    path: "",
    redirectTo: "/1",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonPageRoutingModule {}
