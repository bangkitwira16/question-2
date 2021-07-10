import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
const questionsData = require('../assets/data/questions.json')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions = questionsData
  currentIdx = 0
  questionsLength
  formGroup: FormGroup
  question1: FormControl
  question2: FormControl
  question3: FormControl
  question4: FormControl
  question5: FormControl
  activeQuestion: string;
  errorQuestionIdx
  isCompleted = false;
  constructor(
    private _formBuilder: FormBuilder,

  ) {
    this.activeQuestion = "question1"
    this.errorQuestionIdx = this.validation_messages[this.activeQuestion]
    console.log(this.errorQuestionIdx)
    this.questionsLength = this.questions.length - 1
    this.question1 = new FormControl("", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)]))
    this.question2 = new FormControl("", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)]))
    this.question3 = new FormControl("", Validators.compose([Validators.required, Validators.email]))
    this.question4 = new FormControl("", Validators.compose([Validators.required]))
    this.question5 = new FormControl("", Validators.compose([Validators.required, Validators.min(1), Validators.max(200)]))
    this.formGroup = this._formBuilder.group({
      question1: this.question1,
      question2: this.question2,
      question3: this.question3,
      question4: this.question4,
      question5: this.question5

    })
  }
  nextQuestions(index) {
    switch (this.currentIdx) {
      case 0:
        this.questions[0]["jawaban"] = this.question1.value
        break;
      case 1:
        this.questions[1]["jawaban"] = this.question2.value
        break;
      case 2:
        this.questions[2]["jawaban"] = this.question3.value
        break;
      case 3:
        this.questions[3]["jawaban"] = this.question4.value
        break;
      case 4:
        this.questions[4]["jawaban"] = this.question5.value
        this.save()
        break;
      default:
        break;
    }
    console.log(this.currentIdx)
    this.currentIdx += 1
    this.activeQuestion = `question${index + 1}`
    console.log(this.activeQuestion)
    this.errorQuestionIdx = this.validation_messages[this.activeQuestion]
    console.log(this.errorQuestionIdx)
  }
  getErrorList(errorObject) {
    if (errorObject !== null)
      return Object.keys(errorObject);
  }

  save() {
    console.log(this.question5.value)
    this.isCompleted = true
  }

  validation_messages = {
    question1: [
      { type: "required", message: "Question 1 is required" },
      { type: "minlength", message: "Question 1 minimal 1 character" },
      { type: "maxlength", message: "Question 1 maximal 50 character" },
    ],
    question2: [
      { type: "required", message: "Question 2 is required" },
      { type: "minlength", message: "Question 2 minimal 1 character" },
      { type: "maxlength", message: "Question 2 maximal 50 character" },
    ],
    question3: [
      { type: "required", message: "Question 3 is required" },
      { type: "email", message: "Wrong email format" }
    ],
    question4: [
      { type: "required", message: "Question 4 is required" }
    ],
    question5: [
      { type: "required", message: "Question 5 is required" },
      { type: "min", message: "Question 5 minimal 1" },
      { type: "max", message: "Question 5 maximal 200" }

    ],
  };
}
