import { Router } from "express";
import * as controller from "../../controllers/employeesController";
const router = Router();

router
  .route("/")
  .get(controller.getAllEmployees)
  .post(controller.createNewEmployee);

router
  .route("/:id")
  .get(controller.getEmployee)
  .put(controller.updateEmployee)
  .delete(controller.deleteEmployee);

export default router;
