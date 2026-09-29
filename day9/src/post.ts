import { VoteType } from "../types";
import { PrivillegePolicy } from "./privillegePolicy";
import { Tag } from "./tags";
import { User } from "./user";

type PostData = {
  id: string;
  body: string;
  createdBy: User;
};
abstract class Post {
  votes: Map<string, VoteType> = new Map();
  constructor(
    public id: string,
    public body: string,
    public createdBy: User,
    public createdAt: number = Date.now(),
    public updatedAt: number = Date.now(),
  ) {}

  vote(voter: User, VoteType: VoteType, policy: PrivillegePolicy) {}
  getScore() {}
}

class Question extends Post {
  public answers: Map<string, Answer>;
  public comments: Map<string, Comment>;
  public tags: Set<Tag> = new Set();
  acceptedAnswerId: string | null = null;
  constructor(
    public title: string,
    public data: PostData,
  ) {
    super(data.id, data.body, data.createdBy);
    this.answers = new Map();
    this.comments = new Map();
  }

  addAnswer(newAnswer: Answer) {
    this.answers.set(newAnswer.id, newAnswer);
  }

  addComment(newComment: Comment) {
    this.comments.set(newComment.id, newComment);
  }

  addCommentToAnswer(
    answerId: string,
    author: User,
    body: string,
    policy: PrivillegePolicy,
  ) {}
  acceptAnswer(answerId: string, questionOwner: User) {}
  unacceptAnswer(questionOwner: User) {}
  getAnswerForDisplay() {}
}

class Answer extends Post {
  public comments: Map<string, Comment>;
  constructor(public data: PostData) {
    super(data.id, data.body, data.createdBy);
    this.comments = new Map();
  }
  addComment(newComment: Comment) {
    this.comments.set(newComment.id, newComment);
  }
}

class Comment extends Post {
  constructor(public data: PostData) {
    super(data.id, data.body, data.createdBy);
  }
}

export { Answer, Comment, Post, Question };
