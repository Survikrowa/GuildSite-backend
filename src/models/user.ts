import { Sequelize, Model, DataTypes, NOW } from "sequelize";

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IP}/${process.env.DB_NAME}`
);

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public userRank!: string;
  public userAvatar!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public authenticated!: boolean;
  public authCodeId!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRank: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Studenciak",
    },
    userAvatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Link później",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    authenticated: {
      type: DataTypes.BOOLEAN,
    },
    authCodeId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    tableName: "mzg_backend",
    sequelize,
  }
);

export const createUser = async (
  { username, password, email }: Partial<User>,
  authCodeId: number
) => {
  try {
    await User.create({
      username,
      password,
      email,
      authCodeId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    return await User.findOne({
      where: {
        username,
      },
    });
  } catch (error) {
    return error;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await User.findOne({
      where: {
        email,
      },
    });
  } catch (error) {
    return error;
  }
};

export const checkDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Success db connection");
  } catch (error) {
    console.error(error);
  }
};
