import React, { Component } from 'react'
import axios from 'axios'
import QuestionCard from './QuestionCard'

class Quiz extends Component {
    state = {
      quiz: [
        { 
          question: '',
          category: '',
          correct_answer: '',
          incorrect_answers: ['']
      }
      ],
      displayQuiz: true,
      finalScore: 0,
      position: 0
    }

  componentWillMount = async () => {
    let questions = []
    const response = await this.getQuiz()
    response.data.data.results.forEach(question => {
      questions.push(question)
    })
    this.setState({
      quiz: questions
    })
  }

  calculateScore = (event) => {
    const quiz = this.state.quiz;
    let finalScore = this.state.finalScore;
    let position = this.state.position;
    let displayQuiz = true;
    if(event){ finalScore = (event.target.name === event.target.id) ? finalScore + 1 : finalScore + 0 };
    quiz.length > position + 1 ? position = position + 1 : displayQuiz = false
    this.setState({
      finalScore: finalScore,
      position : position,
      displayQuiz : displayQuiz
    })
  }

  getQuiz = async () => {
    const url = 'https://quiz-me-api.herokuapp.com/api/quiz'
    return await axios.get(url)
  }

  render () {
    let quiz = this.state.quiz
    return (
      <div className='container'>
        {this.state.displayQuiz ?  
          <div>
            <QuestionCard 
            question={quiz[this.state.position]} 
            id={this.state.position + 1} 
            calculateScore={this.calculateScore}
            timer={10} />
          </div> 
          :
          <div className='d-flex justify-content-center'>
            <h1 className='border rounded-pill bg-info m-4 p-4 text-center text-white w-50'>
              Time is up! Your score is {this.state.finalScore}
            </h1>          
          </div> 
          }
        </div> 
    )
  }
}

export default Quiz;
