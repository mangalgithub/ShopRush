const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
 email: { type: String, required: true, unique: true },
 password: { type: Buffer, required: true },
 role: { type: String, required: true,default:'user'},
 addresses: { type: [Schema.Types.Mixed]},
  name: { type: String },
  orders:{type:[Schema.Types.Mixed]},
  salt:Buffer
});

const virtual = UserSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
UserSchema.set("toJSON", {
  virtuals: true,
  versionkey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", UserSchema);
