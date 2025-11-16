// Criação de Ids
export function uid(prefix = "") {
  return prefix + Math.random().toString(36).substring(2, 9);
}

export function byId<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}