import { ProductosMemDAO } from './DAOs/memory';
import { ProductosSql3DAO } from './DAOs/sqlite3';
import { ProductosFSDAO } from './DAOs/fs';
import { ProductosMYSQL3DAO } from './DAOs/mySQL';
import { ProductosMongoDBDAO } from './DAOs/mongoDB';


export enum TipoPersistencia {
  MEMORIA = 'MEM',
  SQLITE3 ='SLQ3',
  FILESYSTEM = 'FS',
  MYSQL = 'MYSQL',
  MONGODB = 'MONGODB',
  MONGOATLAS = 'MONGOATLAS'
}

import path from 'path';

export class NoticiasFactoryDAO {


  static get(tipo: TipoPersistencia) {
    let instance;

    switch (tipo) {
      case TipoPersistencia.SQLITE3:
        if(instance===undefined){
          instance=new ProductosSql3DAO();
        }
        console.log('Retornando instancia de SQLITE3');
        return instance;

      case TipoPersistencia.FILESYSTEM:
        console.log('Retornando instancia de FILESYSTEM');
        const filePath = path.resolve(__dirname, './DAOs/persistenciaFS.json');
        if(!instance){
          instance=new ProductosFSDAO(filePath);
        }
        return instance;

      case TipoPersistencia.MYSQL:
        console.log('Retornando instancia de MYSQL');
        if(!instance){
          instance=new ProductosMYSQL3DAO();
        }
        return instance;       

      case TipoPersistencia.MONGODB:
        console.log('Retornando instancia de MONGODB LOCAL');  
        if(!instance){
          instance=new ProductosMongoDBDAO(true);
        }
        return instance;       

      case TipoPersistencia.MONGOATLAS:
        console.log('Retornando instancia de MONGOATLAS');    
        if(!instance){
          instance=new ProductosMongoDBDAO(); 
        }
        return instance;   

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        if(!instance){
          instance=new ProductosMemDAO(); 
        }
        return instance;  
    }
  }
}