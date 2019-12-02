import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import quizService from './quizService';
import QuestionBox from './QuestionBox';
import Result from './Result';

class Quiz extends Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0
    };
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };

    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer){
            this.setState({
                score: this.state.score + 1
            });
            
        };
        this.setState({
            response: this.state.response < 5 ? this.state.responses + 1 : 5
        });
    };

    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            response: 0
        });

    }

    componentDidMount() {
        this.getQuestions();

    }

    render() {
        return (
            <div className="container">
                <div className="Title">Quiz</div>
        {this.state.questionBank.length > 0 && 
        this.state.responses < 5 &&
         this.state.questionBank.map( 
            ({question, answers, correct, questionId}) =>(
            <QuestionBox question={question}
                options={answers}
                key={questionId}
                selected={answer => this.computeAnswer(answer, correct)}
                />
                )
             ) }


             {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
            </div>
        )
    }
}

ReactDOM.render(<Quiz/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
