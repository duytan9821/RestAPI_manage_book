const router = require("express").Router();
const Book = require("../models/Book");
const books = require("../config/books.json");

router.get("/books", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        // let sort = req.query.sort || "id";
        let category = req.query.category || "All";

        const categoryOptions = [
            "Sách tham khảo",
            "Sách luyện thi",
            "Truyện, tiểu thuyết",
            "Sách công nghệ",
            "Ngô Sỹ Liên",
            "Sách lịch sử",
        ];

        // author, title, category 

        category === "All"
            ? (category = [...categoryOptions])
            : (category = req.query.category.split(","));

        // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        // let sortBy = {};
        // if (sort[1]) {
        //     sortBy[sort[0]] = sort[1];
        // } else {
        //     sortBy[sort[0]] = "asc";
        // }

        const books = await Book.find({ name: { $regex: search, $options: "i" } })
            .where("category")
            .in([...category])
        // // .sort(sortBy)
        // .skip(page * limit)
        // .limit(limit);

        // const books_author = await Book.find({ name: { $regex: search, $options: "i" } })
        //     .where("author")
        //     .in([...author])
        //     // .sort(sortBy)
        //     .skip(page * limit)
        //     .limit(limit);

        // const books_title = await Book.find({ name: { $regex: search, $options: "i" } })
        //     .where("title")
        //     .in([...title])
        //     // .sort(sortBy)
        //     .skip(page * limit)
        //     .limit(limit);

        const total = await Book.countDocuments({
            category: { $in: [...category] },
            name: { $regex: search, $options: "i" },
        });

        const response = {
            // error: false,
            total,
            page: page + 1,
            limit,
            // categorys: categoryOptions,
            books,
            // books_author,
            // books_title
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// const insertBooks = async () => {
//     try {
//         const docs = await Book.insertMany(books);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err)
//     }
// };

// insertBooks()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))



module.exports = router;
