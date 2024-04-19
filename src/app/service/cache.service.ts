import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CacheService {
    obtenerDatoLocal(indice: string): any {
        const valor = localStorage.getItem(indice);
        if (valor) {
            return JSON.parse(valor);
        } else {
            return null;
        }
    }

    guardarDatoLocal(indice: string, valor: any) {
        const valorString = JSON.stringify(valor);
        localStorage.setItem(indice, valorString);
    }
}