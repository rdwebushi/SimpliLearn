import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string="";
  public questionList : any =[];
  public currentQuestion :number =0; 
  public points:number = 0;
  correctAnswer:number = 0;
  incorrectAnswer:number = 0;
  isTestCompleated: boolean=false;
  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }
  getAllQuestions(){
    this.questionService.getQuestionJson()
  .subscribe(res=>{
    this.questionList = res.questions; 
  })
  
  }
  nextQueestion(){
      this.currentQuestion++;
  }
  previousQuestion(){
      this.currentQuestion--;
  }
  answer(currentQno:number,option:any){
    if(currentQno ===this.questionList.length){
      this.isTestCompleated= true;
     
    }
    if(option.correct){
      this.points+=2;
      this.correctAnswer++;
      this.currentQuestion++;
    }else{
      this.points-=1;
      this.currentQuestion++;
      this.incorrectAnswer++;

    }
  }
  
}

