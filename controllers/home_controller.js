module.exports.front = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};
