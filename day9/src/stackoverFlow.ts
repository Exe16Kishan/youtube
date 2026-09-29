import { randomUUIDv7 } from "crypto";
import { Answer, Comment, Question } from "./post";
import { User } from "./user";
import { VoteType } from "../types";


let count = 1
class StackOverFlow {
  public users: Map<string, User> = new Map();
  public questions: Map<string, Question> = new Map();

  createUser(name: string): User {
    // generateId
    const userId = randomUUIDv7();
    const displayName = `stack-${name}`;
    const newUser = new User(userId, name, displayName);
    this.users.set(userId, newUser);
    return newUser;
  }

  createQuestion(title: string, body: string, author: User) {
    const questionId = `q-${count}`;
    count+=1;

    const newQuestion = new Question(title, {
      id: questionId,
      body: body,
      createdBy: author,
    });
    this.questions.set(questionId, newQuestion);
    return newQuestion;
  }

  addAnswer(questionId: string, body: string, author: User) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log("question not found ");
      return;
    }
    const answerId = `a-${count}`;
    count+=1;

    const newAnswer = new Answer({ id: answerId, body, createdBy: author });
    question.addAnswer(newAnswer);
  }

  addCommentToQuestion(questionId: string, body: string, author: User) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log(" question not exists");
      return;
    }
    const commentId = `cq-${count}`;
    count+=1;

    const newComment = new Comment({
      id: commentId,
      createdBy: author,
      body,
    });

    question.addComment(newComment);
  }

  addCommentToAnswer(
    questionId: string,
    answerId: string,
    body: string,
    author: User,
  ) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log(" question not found");
      return;
    }

    const answer = question.answers.get(answerId);
    if (!answer) {
      console.log("answer not found");
      return;
    }

    const commentId = `ca-${count}`;
    count+=1;
    const newComment = new Comment({
      id: commentId,
      body,
      createdBy: author,
    });
    answer.addComment(newComment);
  }

  voteQuestion(questionId : string , voter : User , VoteType :VoteType){}
  voteAnswer(questionId:string , answerId:string , voter :User ,VoteType:VoteType ){}
  voteQuestionComment(questionId:string , commentId:string , voter:User , VoteType:VoteType){}
  voteAnswerComment(questionId:string , answerId:string , voter:User , VoteType:VoteType){}
  acceptAnswer(questionId:string , answerId:string , questionOwner:User){}
  unacceptAnswer(questionId:string,questionOwner:User){}


}

export { StackOverFlow };
