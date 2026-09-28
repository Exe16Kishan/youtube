import { randomUUIDv7 } from "crypto";
import { Answer, Comment, Question } from "./post";
import { User } from "./user";

class StackOverFlow {
  public users: Map<string, User> = new Map();
  public questions: Map<string, Question> = new Map();

  createUser(name: string) {
    // generateId
    const userId = randomUUIDv7();
    const displayName = `stack-${name}`;
    if (this.users.has(userId)) {
      console.log("user already exists");
      return;
    }
    const newUser = new User(userId, name, displayName);
    this.users.set(userId, newUser);
  }

  createQuestion(title: string, body: string, author: User) {
    const questionId = randomUUIDv7();
    if (this.questions.has(questionId)) {
      console.log("question already present");
      return;
    }
    const newQuestion = new Question(title, {
      id: questionId,
      body: body,
      createdBy: author,
    });
    this.questions.set(questionId, newQuestion);
  }

  addAnswer(questionId: string, body: string, author: User) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log("question not found ");
      return;
    }
    const answerId = randomUUIDv7();

    const newAnswer = new Answer({ id: answerId, body, createdBy: author });
    question.addAnswer(newAnswer);
  }

  addCommentToQuestion(questionId: string, body: string, author: User) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log(" question not exists");
      return;
    }
    const commentId = randomUUIDv7();

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

    const commentId = randomUUIDv7();
    const newComment = new Comment({
      id: commentId,
      body,
      createdBy: author,
    });
    answer.addComment(newComment);
  }
}

export { StackOverFlow };
