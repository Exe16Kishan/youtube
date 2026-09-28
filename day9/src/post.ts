import { User } from "./user";

type PostData = {
    id:string ,
    body:string ,
    createdBy : User
}
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

  addAnswer(Answer: Answer) {}

  addComment(Comment: Comment) {}
}

class Answer extends Post {
  public comments: Map<string, Comment>;
  constructor(public data: PostData) {
    super(data.id, data.body, data.createdBy);
    this.comments = new Map();
  }
  addComment(Comment: Comment) {
    const newComment = new Comment()
  }
}

class Comment extends Post {
  constructor(public data: PostData) {
    super(data.id, data.body, data.createdBy);
  }
}

export { Answer, Comment, Post, Question };
