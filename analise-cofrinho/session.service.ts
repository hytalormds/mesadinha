import { mesadinhaApi } from "@/shared/api/mesadinha";
import type { Usuario } from "@/types/navigation";

let currentUser: Usuario | null = null;
let currentToken: string | null = null;

export function setSession(token: string, user: Usuario) {
  currentToken = token;
  currentUser = user;
  mesadinhaApi.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearSession() {
  currentToken = null;
  currentUser = null;
  delete mesadinhaApi.defaults.headers.common.Authorization;
}

export function getCurrentUser() {
  return currentUser;
}

export function getCurrentToken() {
  return currentToken;
}
