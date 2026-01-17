import { Prato } from "./Prato";
import { Combo } from "./Combo";
import type { PratoDTO } from "./Prato";
import { CategoriaPrato } from "../enums/CategoriaPrato";

export class PratoFactory {
  static fromJSON(json: PratoDTO): Prato {
    // COMBO
    if (json.categoria === CategoriaPrato.COMBOS) {
      return Combo.fromJSON(json);
    }

    // PRATO SIMPLES
    return Prato.fromJSON(json);
  }
}
