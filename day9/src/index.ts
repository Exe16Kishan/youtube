import { Question } from "./post"
import { StackOverFlow } from "./stackoverFlow"
import { User } from "./user"

console.log("stack overflowwww")


// lets test is it working or not

const system = new StackOverFlow()

// create users

const kishan = system.createUser("kishan")
const aman = system.createUser("aman")

// console.log(system.users) // we are getting users 

// create some questions
const title = "what is lld ?"
const body = "i m confused so i am asking this "
const question1 = system.createQuestion(title,body,kishan)
console.log(question1)

const title2 = "what is hld ?"
const body2 = "i m confused so i am asking this "
const question2 = system.createQuestion(title2,body2,aman)


// lets add some answer
const answer = "its all about writing code and scaling the application "
system.addAnswer("q-1",answer ,aman)

system.addCommentToAnswer("q-1","a-3","no this is not the perfect definition",kishan)

console.dir(system.questions,{ depth: null, colors: true }) 





