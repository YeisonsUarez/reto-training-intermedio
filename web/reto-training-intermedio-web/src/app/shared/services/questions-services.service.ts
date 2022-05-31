import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { QuestionDTO } from './dto/question-dto.model';
import { environment } from 'src/environments/environment.prod';
import { ServicesContext } from 'src/app/constants/services-context';


@Injectable({
  providedIn: 'root'
})
export class QuestionsServicesService {

  constructor(private http: HttpClient) { }

  getAll():Observable<QuestionDTO[]>{
    return this.http.get<QuestionDTO[]>(environment.apiUrlBase+ServicesContext.QUESTIONS_SERVICES.GET_ALL)
  }
}
