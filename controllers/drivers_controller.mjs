import Driver from '../models/driver.mjs';

export default {

  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const { id } = req.params;
    const props = req.body;
    Driver.findByIdAndUpdate({ _id: id }, props)
      .then(() => Driver.findById({ _id: id }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const { id } = req.params;
    Driver.findByIdAndRemove({ _id: id })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  },

  index(req, res, next) {
    const { lng, lat } = req.query;
    
    Driver.find({
      geometry: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 200000
        }
      }
    })
      .then(drivers => res.send(drivers))
      .catch(next);
  },
};