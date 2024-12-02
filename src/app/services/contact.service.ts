import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //adress de serveur backend
  //adress de destination
  contactURL:string='http://localhost:3000/contacts';
  constructor(private httpClient:HttpClient) { }
   // request to contact
  // reponse:boolean/string
  addcontact(contactObject:any){
    
    return this.httpClient.post<{msg:string}>(this.contactURL,contactObject);
 }
 //request to delete contactById
   //reponse :boolean (true or false)
   deletecontactById(id:any){
    return this.httpClient.delete<{msg:string}>(`${this.contactURL}/${id}`);
  }
  //request to get allcontacts
  //reponse:array of object(tableau des objet)
  getAllcontacts(){
    return this.httpClient.get<{T:any}>(this.contactURL);
  }

  
  //request to get contactById
  //reponse:one object
  getcontactById(id:any){
    //return this.httpClient.get(this.contactURL +'/'+ id);
    return this.httpClient.get<{T:any}>(`${this.contactURL}/${id}`);

  }
  //request to send message
  sendMessage(id:any,contactObject:any){
    return this.httpClient.post<{msg:any}>(`${this.contactURL}/${id}`,contactObject)
  }
}
