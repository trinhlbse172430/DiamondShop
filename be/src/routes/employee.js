// const express = require("express");
// const {
// 	loginAccount,
// 	registerAccount,
// 	getListUser,
// 	updateUserById,
// 	deleteUserById,
// 	logOutAccount,
// 	getUserById,
// } = require("../controllers/employee");
// const { checkAuthAndRole } = require("../middleware/auth");

// const router = express.Router();

// router.post("/login", loginAccount);
// router.post("/register", registerAccount);
// router.get("/users", checkAuthAndRole([1, 2]), getListUser);
// router.put("/user/:id", checkAuthAndRole([1, 2, 3]), updateUserById);
// router.get("/user/:id", checkAuthAndRole([1, 2, 3]), getUserById);
// router.patch("/user/:id", checkAuthAndRole([1, 2]), deleteUserById);
// router.get("/logout", logOutAccount);

// module.exports = router;


const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee");

router.post("/employee", employeeController.create);

router.post("/employee/login", employeeController.login);

router.get("/employee", employeeController.findAll);

router.get("/employee/:id", employeeController.findOne);

router.put("/employee/:id", employeeController.update);

router.delete("/employee/:id", employeeController.delete);

module.exports = router;

