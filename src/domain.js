const api = process.env.REACT_APP_API

export const END_POINTS = {
     contest: `${api}/admin/contest`,
     withdraw: `${api}/withdraw`,
     balance: `${api}/balance`,
     addmoney: `${api}/addmoney`,
     withdrawRequests: `${api}/withdraw-requests`,
     addQuize: `${api}/add-quizzes/`,
     getQuestions: `${api}/get-questions/`,
     // login  :`${api}/login`,
     // verify  :`${api}/verify`,
     // orders  :`${api}/orders`,
}