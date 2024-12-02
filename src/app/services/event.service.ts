import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

 //adress de serveur backend
  //adress de destination
  eventURL:string='http://localhost:3000/events';
  constructor(private httpClient:HttpClient) { }
   // request to event
  // reponse:boolean/string
  addevent(eventObject:any,photo:File){
    let fData=new FormData();
    fData.append("name",eventObject.name);
    fData.append("place",eventObject.place);
    fData.append("date",eventObject.date);
    fData.append("description",eventObject.description);
    fData.append("avatar",photo);
    return this.httpClient.post<{msg:string}>(this.eventURL,fData);
 }
 //request to delete eventById
   //reponse :boolean (true or false)
   deleteeventById(id:any){
    return this.httpClient.delete<{msg:string}>(`${this.eventURL}/${id}`);
  }
  //request to get allevents
  //reponse:array of object(tableau des objet)
  getAllevents(){
    return this.httpClient.get<{T:any}>(this.eventURL);
  }
  // request to Editevent
  // reponse:boolean/string
  editevent(object:any){
    return this.httpClient.put<{ msg:string}>(this.eventURL,object);
  }
  
  //request to get eventById
  //reponse:one object
  geteventById(id:any){
    //return this.httpClient.get(this.eventURL +'/'+ id);
    return this.httpClient.get<{T:any}>(`${this.eventURL}/${id}`);

  }
}
