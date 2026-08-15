const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {

    const isExist = await Cart.findOne({
        user: req.session.user.id,
        course: req.params.id
    });

    if (isExist) {
        return res.redirect("/courses");
    }

    await Cart.create({
        user: req.session.user.id,
        course: req.params.id
    });

    res.redirect("/courses");
}

exports.getCart = async (req, res) => {

    const carts = await Cart.find({
        user: req.session.user.id
    }).populate("course");

    const totalPrice = carts.reduce((sum, item) => {
        return sum + item.course.price;
    }, 0);

    res.render("cart", {
        carts,
        totalPrice
    });

};


exports.removeFromCart = async (req, res) => {

    try {

        const { id } = req.params;

        await Cart.findByIdAndDelete(id);

        res.redirect("/cart");

    } catch (error) {

        console.log(error);

        res.status(500).send("Server Error");

    }

};


exports.getAllOrders = async (req, res) => {


    if (!req.session.user || req.session.user.role !== "ADMIN") {
        return res.status(403).send("Access Denied");
    }

    const carts = await Cart.find({})
        .populate("user")
        .populate("course");

    const usersOrders = {};

    carts.forEach(item => {

        const userId = item.user._id.toString();

        if (!usersOrders[userId]) {

            usersOrders[userId] = {
                username: item.user.username,
                courses: [],
                totalPrice: 0
            };

        }

        usersOrders[userId].courses.push(item.course);

        usersOrders[userId].totalPrice += Number(item.course.price);

    });

    res.render("orders", {
        usersOrders: Object.values(usersOrders)
    });

};


