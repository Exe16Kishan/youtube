import { randomUUIDv7 } from "crypto";
import { VoteType } from "../types";
import { Answer, Comment, Question } from "./post";
import { PrivillegePolicy } from "./privillegePolicy";
import { Tag } from "./tags";
import { User } from "./user";

let count = 1;
class StackOverFlow {
  public users: Map<string, User> = new Map();
  public questions: Map<string, Question> = new Map();

  constructor(private policy: PrivillegePolicy) {
    this.policy = policy;
  }

  createUser(name: string): User {
    // generateId
    const userId = randomUUIDv7();
    const displayName = `stack-${name}`;
    const newUser = new User(userId, name, displayName);
    this.users.set(userId, newUser);
    return newUser;
  }

  createQuestion(title: string, body: string, author: User, tag: Tag[]) {
    const questionId = `q-${count}`;
    count += 1;

    const newQuestion = new Question(
      title,
      {
        id: questionId,
        body: body,
        createdBy: author,
      },
      tag,
    );
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
    count += 1;

    const newAnswer = new Answer({ id: answerId, body, createdBy: author });
    question.addAnswer(newAnswer);
  }

  addCommentToQuestion(questionId: string, body: string, author: User) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log(" question not exists");
      return;
    }
    if (!this.policy.validateComment(author, question)) {
      console.log("cannot vote");
      return;
    }
    const commentId = `cq-${count}`;
    count += 1;

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
    if (!this.policy.validateComment(author, answer)) {
      console.log("cannot vote");
      return;
    }

    const commentId = `ca-${count}`;
    count += 1;
    const newComment = new Comment({
      id: commentId,
      body,
      createdBy: author,
    });
    answer.addComment(newComment);
  }

  voteQuestion(questionId: string, voter: User, voteType: VoteType) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log("question not found ");
      return;
    }
    question.vote(voter, voteType, this.policy);
  }

  voteAnswer(
    questionId: string,
    answerId: string,
    voter: User,
    voteType: VoteType,
  ) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log("question not found ");
      return;
    }

    const answer = question.answers.get(answerId);
    if (!answer) {
      console.log("answer not found ");
      return;
    }

    answer.vote(voter, voteType, this.policy);
  }

  voteQuestionComment(
    questionId: string,
    commentId: string,
    voter: User,
    voteType: VoteType,
  ) {
    if (voteType == VoteType.DOWNVOTE) {
      console.log("comments cannot be downvoted");
      return;
    }
    const question = this.questions.get(questionId);
    if (!question) {
      console.log("question not found ");
      return;
    }
    const comment = question.comments.get(commentId);
    if (!comment) {
      console.log("comment not found");
      return;
    }

    comment.vote(voter, voteType, this.policy);
  }

  voteAnswerComment(
    questionId: string,
    answerId: string,
    commentId: string,
    voter: User,
    voteType: VoteType,
  ) {
    if (voteType === VoteType.DOWNVOTE) {
      console.log("cannot downvote the comment ");
      return;
    }

    const question = this.questions.get(questionId);
    if (!question) {
      console.log("question not found");
      return;
    }

    const answer = question.answers.get(answerId);
    if (!answer) {
      console.log("answer not found ");
      return;
    }
    const comment = answer.comments.get(commentId);
    if (!comment) {
      console.log("comment not found");
      return;
    }
    comment.vote(voter, voteType, this.policy);
  }

  acceptAnswer(questionId: string, answerId: string, questionOwner: User) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log("question not found");
      return;
    }
    const answer = question.answers.get(answerId);
    if (!answer) {
      console.log("answer not found");
      return;
    }
    question.acceptAnswer(answerId, questionOwner);
  }

  unacceptAnswer(questionId: string, questionOwner: User) {
    const question = this.questions.get(questionId);
    if (!question) {
      console.log("question not found");
      return;
    }
    question.unacceptAnswer(questionOwner);
  }

  // just for testing
  showQuetion(questionid: string) {
    console.dir(this.questions.get(questionid),{ depth: null, colors: true });
  }
}

export { StackOverFlow };
