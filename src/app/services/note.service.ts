import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

 //adress de serveur backend
  //adress de destination
  noteURL:string='http://localhost:3000/notes';
  constructor(private httpClient:HttpClient) { }
   // request to note
  // reponse:boolean/string
  addnote(noteObject:any){
    
    return this.httpClient.post<{msg:string}>(this.noteURL,noteObject);
 }
 //request to delete noteById
   //reponse :boolean (true or false)
   deletenoteById(id:any){
    return this.httpClient.delete<{msg:string}>(`${this.noteURL}/${id}`);
  }
  //request to get allnotes
  //reponse:array of object(tableau des objet)
  getAllnotes(){
    return this.httpClient.get<{T:any}>(this.noteURL);
  }
  // request to Editnote
  // reponse:boolean/string
  editnote(object:any){
    return this.httpClient.put<{ msg:string}>(this.noteURL,object);
  }
  
  //request to get noteById
  //reponse:one object
  getnoteById(id:any){
    //return this.httpClient.get(this.noteURL +'/'+ id);
    return this.httpClient.get<{T:any}>(`${this.noteURL}/${id}`);

  }
}