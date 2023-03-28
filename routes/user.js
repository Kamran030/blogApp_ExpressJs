const express = require("express");
const router = express.Router();
const db = require("../data/db");

router.use("/blogs/category/:categoryid", async function (req, res) {
  const id = req.params.categoryid;
  try {
    const [blogs] = await db.execute("select * from blog where categoryid=?", [
      id,
    ]);
    const [categories] = await db.execute("SELECT * FROM category ");
    res.render("users/blogs", {
      title: "Butun Kurslar",
      categories: categories,
      blogs: blogs,
      selectedCategory: id,
    });
    console.log(selectedCategory);
  } catch (err) {
    console.log(err);
  }
});

router.use("/blogs/:blogid", async function (req, res) {
  const id = req.params.blogid;
  try {
    const [blogs] = await db.execute("select * from blog where blogid=?", [id]);
    const blog = blogs[0];
    if (blog) {
      return res.render("users/blog-details", {
        title: blog.baslik,
        blog: blog,
      });
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.use("/blogs", async function (req, res) {
  try {
    const [blogs] = await db.execute("SELECT * FROM blog where onay=1");
    const [categories] = await db.execute("SELECT * FROM category ");
    res.render("users/blogs", {
      title: "Butun Kurslar",
      categories: categories,
      blogs: blogs,
      selectedCategory: null,
    });
  } catch (error) {
    console.log(error);
  }
});

router.use("/", async function (req, res) {
  try {
    const [blogs] = await db.execute("SELECT * FROM blog where onay=1");
    const [categories] = await db.execute("SELECT * FROM category ");
    res.render("users/index", {
      title: "Popüler Kurslar",
      categories: categories,
      blogs: blogs,
      selectedCategory: null,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// router.use("/", function (req, res) {

//   db.execute("SELECT * FROM blog where onay=1 and anasayfa=1")
//     .then((result) => {
//       db.execute("SELECT * FROM category ")
//         .then((result2) => {
//           console.log(result2[0]);
//           res.render("users/index", {
//             title: "Popüler Kurslar",
//             categories: result2[0],
//             blogs: result[0],
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
