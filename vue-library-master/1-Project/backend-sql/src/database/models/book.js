const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const book = sequelize.define(
    'book',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      isbn: {
        type: DataTypes.STRING(13),
        allowNull: false,
        validate: {
          len: [13, 13],
          notEmpty: true,
        }
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      author: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      numberOfCopies: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        }
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM,
        values: [
          "available",
          "unavailable"
        ],
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  book.associate = (models) => {


    models.book.hasMany(models.file, {
      as: 'images',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.book.getTableName(),
        belongsToColumn: 'images',
      },
    });

    models.book.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.book.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return book;
}; 
/*

// Importing the 'moment' library to work with date and time (although it's not used in this code).
const moment = require('moment');

// Exporting the model definition to be used in other parts of the application.
module.exports = function(sequelize, DataTypes) {
  // Defining the 'book' model using Sequelize ORM.
  const book = sequelize.define(
    'book',  // Name of the model ('book')
    {
      // Defining the fields of the 'book' model.

      id: {
        type: DataTypes.UUID,  // The type of the 'id' field is UUID (Universal Unique Identifier).
        defaultValue: DataTypes.UUIDV4,  // Automatically generate a new UUID value if none is provided.
        primaryKey: true,  // This field is the primary key for the table.
      },

      isbn: {
        type: DataTypes.STRING(13),  // ISBN is a string of exactly 13 characters.
        allowNull: false,  // The 'isbn' field cannot be null.
        validate: {
          len: [13, 13],  // ISBN must be exactly 13 characters long.
          notEmpty: true,  // The 'isbn' field cannot be empty.
        }
      },

      title: {
        type: DataTypes.STRING(255),  // The title is a string up to 255 characters long.
        allowNull: false,  // The 'title' field cannot be null.
        validate: {
          notEmpty: true,  // The 'title' field cannot be empty.
        }
      },

      author: {
        type: DataTypes.STRING(255),  // The author name is a string up to 255 characters long.
        allowNull: false,  // The 'author' field cannot be null.
        validate: {
          notEmpty: true,  // The 'author' field cannot be empty.
        }
      },

      numberOfCopies: {
        type: DataTypes.INTEGER,  // The number of copies is an integer value.
        allowNull: false,  // The 'numberOfCopies' field cannot be null.
        validate: {
          min: 1,  // The number of copies must be at least 1.
        }
      },

      stock: {
        type: DataTypes.INTEGER,  // The stock field is an integer value, representing the available stock of the book.
      },

      status: {
        type: DataTypes.ENUM,  // The 'status' field is an ENUM (enumeration) type.
        values: [
          "available",  // 'available' status
          "unavailable"  // 'unavailable' status
        ],
      },

      importHash: {
        type: DataTypes.STRING(255),  // The 'importHash' is a string field, up to 255 characters long.
        allowNull: true,  // The 'importHash' field can be null.
        unique: true,  // This field must have a unique value across all records.
      },
    },
    {
      // Additional configuration for the model.

      timestamps: true,  // Automatically manage 'createdAt' and 'updatedAt' timestamps.
      paranoid: true,  // Enable 'paranoid' mode (soft deletes), meaning deleted records are not permanently removed.
    },
  );

  // Defining associations (relations) between models.
  book.associate = (models) => {
    // A book can have many associated files (e.g., images).
    models.book.hasMany(models.file, {
      as: 'images',  // The alias for this relationship is 'images'.
      foreignKey: 'belongsToId',  // The foreign key used to reference the book in the 'file' model.
      constraints: false,  // Disable foreign key constraint (useful for polymorphic relations).
      scope: {
        belongsTo: models.book.getTableName(),  // Scope for the association based on the 'book' table.
        belongsToColumn: 'images',  // The column that references the images.
      },
    });

    // A book belongs to a user (the creator).
    models.book.belongsTo(models.user, {
      as: 'createdBy',  // Alias for the user who created the book.
    });

    // A book also belongs to a user (the updater).
    models.book.belongsTo(models.user, {
      as: 'updatedBy',  // Alias for the user who last updated the book.
    });
  };

  // Returning the 'book' model so it can be used elsewhere.
  return book;
}; */