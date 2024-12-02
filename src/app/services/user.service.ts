import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl:string='http://localhost:3000/users';

  constructor(private httpClient:HttpClient,) { }
  getAllUsers() {
    return this.httpClient.get<{ T: any }>(this.userUrl);
  }
  // request to get user teacher
  getAlluserTeachers(){
    return this.httpClient.get<{ T: any }>(`${this.userUrl}/tabTeacher`);
  }
   // request to get user parent
   getAlluserParents(){
    return this.httpClient.get<{ T: any }>(`${this.userUrl}/tabParent`);
  }
   // request to get user student
   getAlluserStudents(){
    return this.httpClient.get<{ T: any }>(`${this.userUrl}/tabStudent`);
  }
  //request to get UserById
  //reponse:one object
  getUserById(id: any) {
    return this.httpClient.get<{ T: any }>(`${this.userUrl}/${id}`);

  }
  //request to delete UserById
  //reponse :boolean (true or false)
  deleteUserById(id: any) {
    return this.httpClient.delete<{msg:string}>(`${this.userUrl}/${id}`);
  }
  //request to validate UserById
  //reponse :boolean (true or false)
  validateUserById(id: any,userObject:any) {
    return this.httpClient.put<{msg:string}>(`${this.userUrl}/${id}`,userObject);
  }
   // request to Adduser
  // reponse:boolean/string
  //userObject{firstName,lastName,tel,email,passwod,role}
  //photo:file
  addUser(userObject: any,photo:File) {
    let fData=new FormData();
    if (userObject.role=='admin') {
      fData.append("firstName",userObject.firstName);
      fData.append("lastName",userObject.lastName);
      fData.append("tel",userObject.tel);
      fData.append("email",userObject.email);
      fData.append("pwd",userObject.pwd);
      fData.append("adress",userObject.adress);
      fData.append("role",userObject.role);
      fData.append("avatar",photo);

    }else if(userObject.role=='student'){
    fData.append("firstName",userObject.firstName);
    fData.append("lastName",userObject.lastName);
    fData.append("tel",userObject.tel);
    fData.append("email",userObject.email);
    fData.append("pwd",userObject.pwd);
    fData.append("adress",userObject.adress);
    fData.append("role",userObject.role);
    fData.append("avatar",photo);

    }else if(userObject.role=='parent'){
      fData.append("firstName",userObject.firstName);
      fData.append("lastName",userObject.lastName);
      fData.append("tel",userObject.tel);
      fData.append("email",userObject.email);
      fData.append("pwd",userObject.pwd);
      fData.append("adress",userObject.adress);
      fData.append("role",userObject.role);
      fData.append("telStudent", userObject.telStudent);
      fData.append("avatar",photo);
    }
    return this.httpClient.post<{msg:string}>(`${this.userUrl}`,fData);
  }
  // add user teacher
  adduserTeacher(userObject:any,photo:File,cv:File){
    let fData=new FormData();
    fData.append("firstName",userObject.firstName);
    fData.append("lastName",userObject.lastName);
    fData.append("tel",userObject.tel);
    fData.append("email",userObject.email);
    fData.append("pwd",userObject.pwd);
    fData.append("role",userObject.role);
    fData.append("adress",userObject.adress);
    fData.append("status",userObject.status);
    fData.append("courses",userObject.courses);
    fData.append("avatar",photo);
    fData.append("cvpdf",cv);
    return this.httpClient.post<{msg:string}>(`${this.userUrl}/adduserteacher`,fData);
  }
 
  // request to Edituser
  // reponse:boolean/string
  editUser(newUser: any) {
    return this.httpClient.put<{ msg: string }>(this.userUrl, newUser);
  }
  // request to search by name
  searchUser(userObject:any){
    return this.httpClient.post<{user:any}>(`${this.userUrl}/tabUser`,userObject);
  }
  // request to connected
  login(userObject: any) {
    return this.httpClient.post<{msg:string,user:any}>(`${this.userUrl}/login`, userObject);
  }
  // request to change password
  changePassword(userId: any, oldPassword:any, newPassword:any) {
    return this.httpClient.put<{ msg: string }>(`${this.userUrl}/change-password`, { userId, oldPassword, newPassword });
  }

  
}


