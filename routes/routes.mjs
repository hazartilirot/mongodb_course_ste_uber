import DriversController from "../controllers/drivers_controller.mjs";

export default (app) => {
  
  app.get('/api', DriversController.greeting)
  
  app.post('/api/drivers', DriversController.create)
}
