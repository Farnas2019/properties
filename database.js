const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'storedb.sqlite'
});

const Model = Sequelize.Model;

// Product model
class houses extends Model {}
houses.init({
  houseName: {
    type: Sequelize.STRING
  },
  housePrice: {
    type: Sequelize.STRING
  },
  houseLocation: {
    type: Sequelize.STRING
  },
 houseDetails: {
    type: Sequelize.STRING
  },
  houseAvailable: {
    type: Sequelize.STRING
  },
  productImg1: {
    type: Sequelize.STRING
  },
  productImg2: {
    type: Sequelize.STRING
  },
  productImg3: {
    type: Sequelize.STRING
  },
  productImg4: {
    type: Sequelize.STRING
  },
  productImg5: {
    type: Sequelize.STRING
  },
  productImg6: {
    type: Sequelize.STRING
  }
}, { sequelize, modelName: 'houses' });

//  sequelize.sync().then(response => {
//    console.log(response)
//  }).catch(error => {
//    console.log(error)
//  })

module.exports = { houses }