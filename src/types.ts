import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Analysis {
  id: number;
  user: User;
  horse: Horse;
  image: string;  // or ArrayBuffer, depending on how you handle binary data
  predictionDetail: PredictionDetail;
  observations: string;
}

export interface User {
  id: number;
  username: string;
}

export interface Horse {
  id: number;
  name: string;
  sexo: Gender;
  dateOfBirth: string;  // Expecting format 'DD-MM-YYYY'
  entrenamiento: boolean;
  estabulacion: boolean;
  salidaAPiquete: boolean;
  dolor: boolean;
  compressedImage: string;  // or ArrayBuffer
  observations: string;
}

export enum Gender {
  MASCULINO = 'Masculino',
  FEMENINO = 'Femenino'
}

export interface PredictionDetail {
  interesado: number
  sereno: number
  disgustado: number
  prediction: PredictionEnum
}

export enum PredictionEnum {
  INTERESADO = 'INTERESADO',
  SERENO = 'SERENO',
  DISGUSTADO = 'DISGUSTADO'
}

export interface Options {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  context?: HttpContext;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json'
  withCredentials?: boolean;
  transferCache?: {
    includeHeaders?: string[];
  } | boolean;

}