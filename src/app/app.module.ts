import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { EventsComponent } from './components/events/events.component';
import { BlogComponent } from './components/blog/blog.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentComponent } from './components/student/student.component';
import { ParentComponent } from './components/parent/parent.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { ParentDetailsComponent } from './components/parent-details/parent-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from'@angular/common/http';
import { RegisterTeacherComponent } from './components/register-teacher/register-teacher.component';
import { RegisterParentComponent } from './components/register-parent/register-parent.component';
import { AboutComponent } from './components/about/about.component';
import { TabTeacherComponent } from './components/tab-teacher/tab-teacher.component';
import { TabStudentComponent } from './components/tab-student/tab-student.component';
import { TabCoursesComponent } from './components/tab-courses/tab-courses.component';
import { TabParentComponent } from './components/tab-parent/tab-parent.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddParentComponent } from './components/add-parent/add-parent.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { EditParentComponent } from './components/edit-parent/edit-parent.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { TabUserComponent } from './components/tab-user/tab-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { RegisterActorComponent } from './components/register-actor/register-actor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,
    EventsComponent,
    BlogComponent,
    CoursesComponent,
    TeacherComponent,
    CourseDetailsComponent,
    TeacherDetailsComponent,
    AdminComponent,
    StudentComponent,
    ParentComponent,
    StudentDetailsComponent,
    ParentDetailsComponent,
    RegisterTeacherComponent,
    RegisterParentComponent,
    AboutComponent,
    TabTeacherComponent,
    TabStudentComponent,
    TabCoursesComponent,
    TabParentComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    AddCourseComponent,
    AddParentComponent,
    AddStudentComponent,
    EditCourseComponent,
    EditParentComponent,
    EditStudentComponent,
    TabUserComponent,
    UserDetailsComponent,
    EditUserComponent,
    AddUserComponent,
    RegisterActorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
