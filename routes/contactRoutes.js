const express = require("express")
const router = express.Router();
const {getContact,getOneContact,createContact,updateContact,deleteContact} = require("../controllers/contactController")
const validateToken = require("../middleware/validateTokenHandler")
router.use(validateToken)
router.route("/").get(getContact)

router.route("/:id").get(getOneContact)

router.route("/").post(createContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)

module.exports = router;