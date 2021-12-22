const Questions = require("../models/question");
const Options = require("../models/option");

module.exports.create = function (req, res) {
  Questions.create(
    { title: req.body.title, vote: false },
    function (err, question) {
      if (err) {
        return res.json(500, {
          message: "Question is not created",
          data: err,
        });
      }
      if (question) {
        return res.json(200, {
          message: "Question Created",
          data: question,
        });
      } else {
        return res.json(400, {
          message: "Question not created",
        });
      }
    }
  );
};

module.exports.deleteQuestion = function (req, res) {
  console.log(req.params.id);
  Questions.findByIdAndDelete(
    { _id: req.params.id },
    function (err, deletedQuestion) {
      if (err) {
        return res.json(500, {
          message: "Question could not be deleted",
          data: err,
        });
      }

      return res.json(200, {
        message: "Question Deleted Successfully",
      });
    }
  );

  Options.deleteMany({ question: req.params.id }, function (err, deleteOption) {
    if (err) {
      return res.json(500, {
        message: "Could not delete Option",
        data: err,
      });
    }
    return res.json(200, {
      message: "Options are also deleted",
    });
  });
};

module.exports.addOptions = function (req, res) {
  Questions.findById({ _id: req.params.id }, function (err, question) {
    if (err) {
      return res.json(500, {
        message: "Could not find question",
        data: err,
      });
    }
    if (question) {
      const id = question.option.length + 1;
      Options.create(
        {
          id: question.option.length + 1,
          question: req.params.id,
          text: req.body.text,
          votes: 0,
          link: `http://localhost:8000/options/${id}/add_vote`,
        },
        function (err, optionCreated) {
          if (err) {
            return res.json(500, {
              message: "option not created",
              data: err,
            });
          }
          Questions.update(
            { _id: req.params.id },
            {
              $push: { option: [optionCreated._id] },
            },
            function (err, QuestionAndOption) {
              if (err) {
                return res.json(500, {
                  message: "Question not updated",
                  data: err,
                });
              }
              return res.json(200, {
                message: "Question And Option Updated",
              });
            }
          );
          question.save();
        }
      );
    } else {
      return res.json(404, {
        message: "Problem",
        data: err,
      });
    }
  });
};

module.exports.showAllQuestions = async (req, res) => {
  try {
    // finding all the questions and returning
    let question = await Questions.findById(req.params.id).populate({
      path: "option",
    });

    if (question) {
      return res.status(200).json({
        message: "Here is the questions",
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not does not exists",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server ",
      data: err,
    });
  }
};
