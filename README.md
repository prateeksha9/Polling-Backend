# Polling-Backend

This is a backend project intended to used at platforms where polling/voting type of situation is expected. With this API you can
- Create your own questions
- Delete the questions
- Add Options to the questions
- View questions along with its options
- Delete Options
- Add Votes to the options

# Important endpoints of the API
- Create your own questions: voteforme-api.herokuapp.com/question/create
- Delete the questions: voteforme-api.herokuapp.com/question/:id/delete
- Add Options to the questions: voteforme-api.herokuapp.com/question/:id/options/create
- View questions along with its options: voteforme-api.herokuapp.com/question/:id
- Add Votes to the options: voteforme-api.herokuapp.com/option/:id/delete
- Delete Options: voteforme-api.herokuapp.com/option/:id/add_vote

# Important Link:
- Video Explaination: https://youtu.be/dccE9hmCcLY
- Hosting Link: https://voteforme-api.herokuapp.com/

# Tech Stack:
- NodeJS
- MongoDB
