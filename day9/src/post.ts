import { VoteType } from "../types";
import { PrivillegePolicy } from "./privillegePolicy";
import { Tag } from "./tags";
import { User } from "./user";

let count = 0;
type PostData = {
  id: string;
  body: string;
  createdBy: User;
};
abstract class Post {
  private votes: Map<string, VoteType> = new Map();
  constructor(
    public id: string,
    public body: string,
    public createdBy: User,
    public createdAt: number = Date.now(),
    public updatedAt: number = Date.now(),
  ) {}

  vote(voter: User, voteType: VoteType, policy: PrivillegePolicy) {
    const allowed = policy.validateVote(voter, this, voteType);
    if (!allowed) {
      console.log("cannot vote");
      return;
    }

    const prevVote = this.votes.get(voter.id);
    this.votes.set(voter.id, voteType);

    // after voting we also have to add repution

    if (!prevVote) {
      if (voteType === VoteType.UPVOTE) {
        this.createdBy.addReputation(10);
      }

      if (voteType === VoteType.DOWNVOTE) {
        this.createdBy.addReputation(-10);
      }
    }
  }
  getScore() {
    const score = [...this.votes.values()].reduce((total , vote)=>total += vote,0)
    console.log(score)
  }
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
  ) {
    const answer = this.answers.get(answerId);
    if (!answer) {
      console.log("answer not found");
      return;
    }
    if (!policy.validateComment(author, answer)) {
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
  acceptAnswer(answerId: string, questionOwner: User) {
    if (this.createdBy.id !== questionOwner.id) {
      console.log("only question owner can accept answerrr");
      return;
    }
    const answer = this.answers.get(answerId);
    if (!answer) {
      console.log("answer not found");
      return;
    }
    this.acceptedAnswerId = answer.id;
  }

  unacceptAnswer(questionOwner: User) {
    if (this.createdBy.id !== questionOwner.id) {
      console.log("the question is not owned by the user");
      return;
    }

    this.acceptedAnswerId = null;
  }
  getAnswerForDisplay() {
    if (this.acceptedAnswerId === null) {
      console.log("no answer have been selected yet");

      return;
    }
    const answer = this.answers.get(this.acceptedAnswerId);
    console.log(answer?.body);
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
