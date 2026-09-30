import { VoteType } from "../types"
import { Question } from "./post"
import { PrivillegePolicy } from "./privillegePolicy"
import { StackOverFlow } from "./stackoverFlow"
import { Tag } from "./tags"
import { User } from "./user"

console.log("stack overflowwww")


// lets test is it working or not

const system = new StackOverFlow(new PrivillegePolicy())

// create users

const kishan = system.createUser("kishan")
const aman = system.createUser("aman")


// giving some reputation just for testing 
kishan.addReputation(200)
aman.addReputation(20)

// console.log(system.users) // we are getting users 

// create some questions
const title = "what is lld ?"
const body = "i m confused so i am asking this "

const question1 = system.createQuestion(title,body,kishan,[new Tag("lld"), new Tag("solution")])
// console.log(question1)

const title2 = "what is hld ?"
const body2 = "i m confused so i am asking this "
const question2 = system.createQuestion(title2,body2,aman,[new Tag("lld"), new Tag("solution")])


// lets add some answer
const answer = "its all about writing code and scaling the application "
system.addAnswer("q-1",answer ,aman)

// system.addCommentToAnswer("q-1","a-3","no this is not the perfect definition",kishan)
// system.addCommentToQuestion("q-1","random stringggggg",aman) // its workingggg


// lets vote the question

system.voteQuestion("q-1",kishan,VoteType.UPVOTE)
system.voteQuestion("q-1",aman,VoteType.UPVOTE)

// lets check the score of the question
question1.getScore()  // its workingggg


// lets vote for the answer 
system.voteAnswer("q-1","a-3",kishan,VoteType.UPVOTE)
system.voteAnswer("q-1","a-3",aman,VoteType.UPVOTE)

console.log(kishan.reputation)

// lets accept answerrr
system.acceptAnswer("q-1","a-3",kishan) // a-3 is accepted as answerrr
system.unacceptAnswer("q-1",kishan) 

system.showQuetion("q-1")
// console.dir(system.questions,{ depth: null, colors: true }) 




