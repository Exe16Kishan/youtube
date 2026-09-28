import { User } from "./user";

type PostData = {
  id: string;
  body: string;
  createdBy: User;
};
abstract class Post {
  constructor(
    public id: string,
    public body: string,
    public createdBy: User,
    public createdAt: number = Date.now(),
    public updatedAt: number = Date.now(),
  ) {}
}

class Question extends Post {
  public answers: Map<string, Answer>;
  public comments: Map<string, Comment>;
  constructor(
    public title: string,
    public data: PostData,
  ) {
    super(data.id, data.body, data.createdBy);
    this.answers = new Map();
    this.comments = new Map();
  }

  addAnswer(newAnswer: Answer) {
    this.answers.set(newAnswer.id, newAnswer)
    
  }

  addComment(newComment: Comment) {
    this.comments.set(newComment.id,newComment)
  }
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
