import { VoteType } from "../types";
import { Post } from "./post";
import { User } from "./user";

class PrivillegePolicy {
  constructor() {}

  validateComment(user: User, post: Post):boolean {
    
  }
  validateVote(user: User, post: Post, VoteType: VoteType):boolean {}
}


export { PrivillegePolicy };
