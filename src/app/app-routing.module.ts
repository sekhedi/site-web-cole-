import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ParentComponent } from './components/parent/parent.component';
import { ParentDetailsComponent } from './components/parent-details/parent-details.component';
import { StudentComponent } from './components/student/student.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { EventsComponent } from './components/events/events.component';
import { RegisterParentComponent } from './components/register-parent/register-parent.component';
import { RegisterTeacherComponent } from './components/register-teacher/register-teacher.component';
import { TabTeacherComponent } from './components/tab-teacher/tab-teacher.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { TabCoursesComponent } from './components/tab-courses/tab-courses.component';
import { AddParentComponent } from './components/add-parent/add-parent.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { EditParentComponent } from './components/edit-parent/edit-parent.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { TabParentComponent } from './components/tab-parent/tab-parent.component';
import { TabStudentComponent } from './components/tab-student/tab-student.component';
import { TabUserComponent } from './components/tab-user/tab-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { RegisterActorComponent } from './components/register-actor/register-actor.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { TabEventComponent } from './components/tab-event/tab-event.component';
import { TabcontactComponent } from './components/tabcontact/tabcontact.component';
import { TabNoteComponent } from './components/tab-note/tab-note.component';
import { NoteComponent } from './components/note/note.component';


const routes: Routes = [{path:'',component:HomeComponent},
                        {path:'registerParent',component:RegisterParentComponent},
                        {path:'registerAdmin',component:RegisterComponent},
                        {path:'registerTeacher',component:RegisterTeacherComponent},
                        {path:'registerStudent',component:RegisterComponent},
                        {path:'admin',component:AdminComponent},
                        {path:'login',component:LoginComponent},
                        {path:'courses',component:CoursesComponent},
                        {path:'courseDetails/:id',component:CourseDetailsComponent},
                        {path:'parent',component:ParentComponent},
                        {path:'parentDetails/:id',component:ParentDetailsComponent},
                        {path:'student',component:StudentComponent},
                        {path:'studentDetails/:id',component:StudentDetailsComponent},
                        {path:'teacher',component:TeacherComponent},
                        {path:'teacherDetails/:id',component:TeacherDetailsComponent},
                        {path:'contact',component:ContactComponent},
                        {path:'blog',component:BlogComponent},
                        {path:'events',component:EventsComponent},
                        {path:'tabTeacher',component:TabTeacherComponent},
                        {path:'addTeacher',component:AddTeacherComponent},
                        {path:'editTeacher/:id',component:EditTeacherComponent},
                        {path:'tabCourse',component:TabCoursesComponent},
                        {path:'addParent',component:AddParentComponent},
                        {path:'addCourse',component:AddCourseComponent},
                        {path:'addStudent',component:AddStudentComponent},
                        {path:'editStudent/:id',component:EditStudentComponent},
                        {path:'editParent/:id',component:EditParentComponent},
                        {path:'editCourse/:id',component:EditCourseComponent},
                        {path:'tabStudent',component:TabStudentComponent},
                        {path:'tabParent',component:TabParentComponent},
                        {path:'tabUser',component:TabUserComponent},
                        {path:'addUser',component:AddUserComponent},
                        {path:'editUser/:id',component:EditUserComponent},
                        {path:'userDetails/:id',component:UserDetailsComponent},
                        {path:'registerActor',component:RegisterActorComponent},
                        {path:'changepwd/:id',component:ChangepasswordComponent},
                        {path:'forgotpwd',component:ForgetpassComponent},
                        {path:'addEvent',component:AddEventComponent},
                        {path:'tabEvent',component:TabEventComponent},
                        {path:'tabContact',component:TabcontactComponent},
                        {path:'tabNote',component:TabNoteComponent},
                        {path:'Note',component:NoteComponent},
                        
                        

                        

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
