import { Router } from "express";
import * as controller from "../../controllers/employeesController";
const router = Router();

router
  .route("/")
  .get(controller.getAllEmployees)
  .post(controller.createNewEmployee)
  .put(controller.updateEmployee)
  .delete(controller.deleteEmployee);
router.route("/:id").get();

export default router;
