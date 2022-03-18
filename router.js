const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

// 首页
router.get("/", (req, res, next) => {
  fs.readFile(
    path.join(__dirname, "./data/data1.json"),
    "utf-8",
    (err, data) => {
      if (err) return next(err);
      const { subjectArray } = JSON.parse(data);
      res.render("main.html", {
        subjectArray,
        url: req.config.url,
        flag: Boolean(subjectArray?.length),
      });
    }
  );
});

// 新增数据页面
router.get("/add", (req, res, next) => {
  res.render("add.html", {
    url: req.config.url,
  });
});

// 新增数据路径
router.post("/add", (req, res, next) => {
  const { subject, A, B, C, D, answer, basis } = req.body;
  const basisArray = basis
    .replace(/[\r\n]/g, " ")
    .split(" ")
    .filter((i) => Boolean(i));

  fs.readFile(
    path.join(__dirname, "./data/data1.json"),
    "utf-8",
    (err, data) => {
      if (err) return next(err);
      let { subjectArray } = JSON.parse(data);
      if (!subjectArray) subjectArray = [];
      subjectArray.unshift({
        subject,
        A,
        B,
        C,
        D,
        answer: answer?.toUpperCase(),
        basisArray,
      });
      fs.writeFile(
        path.join(__dirname, "./data/data1.json"),
        JSON.stringify({
          subjectArray,
        }),
        (err) => {
          if (err) return next(err);
          res.redirect(`${req.config.url}`);
        }
      );
    }
  );
});

// 修改数据页面
router.get("/edit", (req, res, next) => {
  const { index } = req.query;
  fs.readFile(
    path.join(__dirname, "./data/data1.json"),
    "utf-8",
    (err, data) => {
      if (err) return next(err);
      const { subjectArray } = JSON.parse(data);
      res.render("edit.html", {
        subjectData: subjectArray[index],
        index,
        url: req.config.url,
        basisString: subjectArray[index].basisArray.join("\r\n"),
      });
    }
  );
});

// 修改数据路径
router.post("/edit", (req, res, next) => {
  const { index, subject, A, B, C, D, answer, basis } = req.body;
  const basisArray = basis
    .replace(/[\r\n]/g, " ")
    .split(" ")
    .filter((i) => Boolean(i));

  fs.readFile(
    path.join(__dirname, "./data/data1.json"),
    "utf-8",
    (err, data) => {
      if (err) return next(err);
      const { subjectArray } = JSON.parse(data);
      subjectArray.splice(index, 1, {
        subject,
        A,
        B,
        C,
        D,
        answer: answer?.toUpperCase(),
        basisArray,
      });
      fs.writeFile(
        path.join(__dirname, "./data/data1.json"),
        JSON.stringify({
          subjectArray,
        }),
        (err) => {
          if (err) return next(err);
          res.redirect(`${req.config.url}`);
        }
      );
    }
  );
});

// 删除数据路径
router.get("/delete", (req, res, next) => {
  const { index } = req.query;
  fs.readFile(
    path.join(__dirname, "./data/data1.json"),
    "utf-8",
    (err, data) => {
      if (err) return next(err);
      const { subjectArray } = JSON.parse(data);
      subjectArray.splice(index, 1);
      fs.writeFile(
        path.join(__dirname, "./data/data1.json"),
        JSON.stringify({
          subjectArray,
        }),
        (err) => {
          if (err) return next(err);
          res.redirect(`${req.config.url}`);
        }
      );
    }
  );
});

module.exports = router;
