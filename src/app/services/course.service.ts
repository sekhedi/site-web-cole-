import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  
  //adress de serveur backend
  //adress de destination
  courseURL:string='http://localhost:3000/courses';
  constructor(private httpClient:HttpClient) { }
   // request to course
  // reponse:boolean/string
  addcourse(courseObject:any,photo:File){
    let fData=new FormData();
    fData.append("name",courseObject.name);
    fData.append("prix",courseObject.prix);
    fData.append("date",courseObject.date);
    fData.append("description",courseObject.description);
    fData.append("users",courseObject.teachers);
    fData.append("users",courseObject.students);
    fData.append("avatar",photo);
    return this.httpClient.post<{msg:string}>(this.courseURL,fData);
 }
 //request to delete courseById
   //reponse :boolean (true or false)
   deletecourseById(id:any){
    return this.httpClient.delete<{msg:string}>(`${this.courseURL}/${id}`);
  }
  //request to get allcourses
  //reponse:array of object(tableau des objet)
  getAllcourses(){
    return this.httpClient.get<{T:any}>(this.courseURL);
  }
  // request to Editcourse
  // reponse:boolean/string
  editcourse(object:any){
    return this.httpClient.put<{ msg:string}>(this.courseURL,object);
  }
  // request to search by name
  searchCourse(courseObject:any){
    return this.httpClient.post<{course:any}>(`${this.courseURL}/tabCourse`,courseObject);
  }
  //request to get courseById
  //reponse:one object
  getcourseById(id:any){
    //return this.httpClient.get(this.courseURL +'/'+ id);
    return this.httpClient.get<{T:any}>(`${this.courseURL}/${id}`);

  }
}
