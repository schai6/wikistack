var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('Page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    set: function (value) {
      var arrayOfTags;
      if (typeof value === 'string') {
        arrayOfTags = value.split(',').map(function (s) {
          return s.trim();
        });
        this.setDataValue('tags', arrayOfTags);
      } else {
        this.setDataValue('tags', value);
      }
    }
  }
}, {
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  },
});

Page.findByTag = function (tag) {
  return Page.findAll({
    where: {
      tags: {
        $overlap: [tag]
      }
    }
  });
};

Page.prototype.findSimilar = function() {
  return Page.findAll({
    where: {
      tags: {
        $overlap: this.tags
      },
      id: {
        $ne: this.id
      }
    }
  });
};

Page.hook('beforeValidate', (page, options) => {
  page.urlTitle = page.title ? page.title.trim().toLowerCase().replace(/\s+/g, '_').replace(/\W/g, '') : Math.random().toString(36).substring(2, 7);
});

var User = db.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, {
  as: 'author'
});

module.exports = {
  db: db,
  Page: Page,
  User: User
};
