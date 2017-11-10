var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

const Project = sequelize.define('project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
})

const Task = sequelize.define('task', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
})

