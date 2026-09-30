import { VoteType } from "../types";
import { Post } from "./post";
import { User } from "./user";

class PrivillegePolicy {
  constructor() {}

  validateComment(user: User, post: Post):boolean {
    return user.reputation >= 50
  }
  validateVote(user: User, post: Post, voteType: VoteType):boolean {
    if (voteType === VoteType.UPVOTE) {
      return user.reputation >= 15
    }
    if (voteType === VoteType.DOWNVOTE) {
      return user.reputation >= 125
    }
    return false
  }
}


export { PrivillegePolicy };
