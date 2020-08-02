const faker = require('faker');
const mongoose = require('mongoose');

const mongooseTypes = {
  required: {
    string: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    objectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  not_required: {
    string: {
      type: String,
      default: null,
    },
    number: {
      type: Number,
      default: null,
    },
    objectId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
  },
};

mongoose.connect(process.env.MONGO_URL);

const UserSchema = new mongoose.Schema(
  {
    name: mongooseTypes.required.string,
    sex: mongooseTypes.required.string,
    age: mongooseTypes.required.number,
    hobby: mongooseTypes.required.string,
    dayOfBirth: mongooseTypes.required.date,
    email: mongooseTypes.required.string,
    roles: {
      type: [],
      required: false,
    },
    password: mongooseTypes.required.string,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const User = mongoose.model('user', UserSchema);

(async () => {
  const promises = [];
  for (let i = 0; i < 500; i++) {
    const x = new User({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      sex: faker.random.arrayElement(['Male', 'Female']),
      age: faker.random.number(60),
      hobby: faker.random.word(),
      dayOfBirth: faker.date.recent(),
      email: faker.internet.email(),
      roles: ['USER'],
      password: faker.internet.password(),
    }).save();
    promises.push(x);
  }

  return Promise.all(promises);
})().then(() => process.exit());
