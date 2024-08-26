import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Analysis {
  id: number;
  user?: User;
  horse?: Horse;
  image: string;  // or ArrayBuffer, depending on how you handle binary data
  predictionDetail?: PredictionDetail;
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
  compressedImage: Blob;  // or ArrayBuffer
  observations: string;
}

export enum Gender {
  MALE = 'Masculino',
  FEMALE = 'Femenino'
}

export interface PredictionDetail {
  interesado: number
  sereno: number
  disgustado: number
  prediction: PredictionEnum


  // Define the properties based on the structure of PredictionDetail in your Java class
}

export enum PredictionEnum {
  INTERESADO = 'Interesado',
  SERENO = 'Sereno',
  DISGUTADO = 'Disgustado'
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