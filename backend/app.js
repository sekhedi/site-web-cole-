// import express module BE
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
// import bcrypt
const bcrypt = require('bcrypt');
// import axios
const axios = require('axios');
// import jwt
const jwt = require('jsonwebtoken');
const session = require('express-session');
//import mongoose

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB');
// import multer
const multer = require('multer');
// import path
const path = require('path');
//creates express application (app)
const app = express();
// app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const secretKey = 'your-secret-key';
app.use(session({
  secret: secretKey,
}));

app.use('/shortcut', express.static(path.join('backend/images')))
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf'
}

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    if (isValid) {
      cb(null, 'backend/images')
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
      extension;
    cb(null, imgName);
  }
});


// Models importaion

const User = require("./models/user");
const Course = require("./models/course");
const Absence = require("./models/absence");
const Note = require("./models/note");
const Contact = require("./models/contact");
const Event = require("./models/event");
// Security configuration

app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(

    "Access-Control-Allow-Headers",

    "Origin, Accept, Content-Type, X-Requested-with, Authorization"

  );

  res.setHeader(

    "Access-Control-Allow-Methods",

    "GET, POST, DELETE, OPTIONS, PATCH, PUT"

  );

  next();

});

// BUSINESS LOGIC User Service*****

// business Logic:add User
app.post("/users", multer({ storage: storageConfig }).single('avatar'),(req, res) => {
  console.log("here into bl:add user", req.body);
  User.findOne({ tel: req.body.tel }).then((doc) => {
    if (doc) {
      res.json({ msg: "user exist" });

    } else {
      bcrypt.hash(req.body.pwd, 10).then((cruptedPwd) => {
        req.body.pwd = cruptedPwd;     
        (req.file) ?
          req.body.avatar = `http://localhost:3000/shortcut/${req.file.filename}`:
          req.body.avatar = `http://localhost:3000/shortcut/avatar.png`;
      
        let user = new User(req.body);
        user.save();
        res.json({ msg: "is added valid" });

      });

    }
  });
});
// business Logic: add user Teacher
app.post("/users/adduserteacher", multer({ storage: storageConfig }).fields([{name:'avatar',maxCount:1}, {name:'cvpdf',maxCount:1}]), (req, res) => {
  console.log("here into bl:adduserteacher", req.body);
  console.log("here into bl:adduserteacher", req.files);
  User.findOne({ tel: req.body.tel }).then((doc) => {
    if (doc) {
      res.json({ msg: "user exist" });

    } else {
      bcrypt.hash(req.body.pwd, 10).then((cruptedPwd) => {
        req.body.pwd = cruptedPwd;     
        if (req.files) {
          if (req.files.avatar[0]) {
            req.body.avatar = `http://localhost:3000/shortcut/${req.files.avatar[0].filename}`;
          }

          if (req.files.cvpdf[0]) {
            req.body.cvpdf = `http://localhost:3000/shortcut/${req.files.cvpdf[0].filename}`;
          }
        }
        let user = new User(req.body);
        user.save();
        res.json({ msg: "is added valid" });

      });

    }
  });
});
// business Logic:login User
app.post("/users/login", (req, res) => {
  console.log("here into bl:login user", req.body);
  User.findOne({ tel: req.body.tel }).then((doc) => {
    console.log("user doc by phone", doc);
    if (!doc) {
      console.log("phone doses not exist");
      res.json({ msg: " phone not exist" })
    } else {
      //compare pwd 
      bcrypt.compare(req.body.pwd, doc.pwd).then((result) => {
        console.log("here result form bcrypt", result);
        if (result) {
          let userTosend = {
            id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            role: doc.role,
            img: doc.avatar,
          }
          let token = jwt.sign(userTosend, secretKey, { expiresIn: '1h' })
          console.log("here token", token);
          res.json({ msg: "welcom", user: token });
        } else {
          res.json({ msg: "chek pwd" });

        }
      });
    }
  });

});
// business logic:change password
app.put("/users/change-password", async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Vérifiez si les données nécessaires sont fournies
    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    console.log("Données reçues :", req.body);

    // Vérifiez si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Vérifiez si l'ancien mot de passe est correct
    const isMatch = await bcrypt.compare(oldPassword, user.pwd);
    if (!isMatch) {
      return res.status(400).json({ msg: "Ancien mot de passe incorrect" });
    }

    // Hachez le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettez à jour le mot de passe
    user.pwd = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Mot de passe modifié avec succès" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ msg: "Erreur lors du changement de mot de passe" });
  }
});
// business Logic :forgot password

// business Logic:validate user by id
app.put("/users/:id", (req, res) => {
  console.log("here into bl: validate user by id", req.params.id);
  User.findByIdAndUpdate({_id:req.params.id } ,  { status: 'valid' },{ returnOriginal: false }).then(
    (updatedUser) => {
      if (updatedUser) {
        console.log('User updated successfully:', updatedUser);
      }

      res.json({ msg: "user is validate" });

    });
});

// business Logic:Get All users
app.get("/users", (req, res) => {
  console.log("here into bl:get all users ", req.body);
  User.find().then(
    (docs) => {
      res.json({ T: docs });
    });

});
// business logic : get all user teacher 
app.get("/users/tabTeacher", (req, res) => {
  console.log("here into bl:get all users teacher ", req.body);
  User.find({ role: 'teacher' }).populate("courses").then(
    (docs) => {
      res.json({ T: docs });
    });

});
// business logic : get all user student 
app.get("/users/tabStudent", (req, res) => {
  console.log("here into bl:get all users student ", req.body);
  User.find({ role: 'student' }).then(
    (docs) => {
      res.json({ T: docs });
    });

});
// business logic : get all user parent 
app.get("/users/tabParent", (req, res) => {
  console.log("here into bl:get all users parent ", req.body);
  User.find({ role: 'parent' }).populate("telStudent").then(
    (docs) => {
      res.json({ T: docs });
    });

});
// business Logic:Get user by id
app.get("/users/:id", (req, res) => {
  console.log("here into bl:get user by id", req.params.id);
  User.findById(req.params.id).populate("courses").then(
    (doc) => {
      res.json({ T: doc });
    });
});
// business logic: delete user
app.delete("/users/:id", async (req, res) => {
  try {
    console.log("here into bl:delete user by id", req.params.id);
    await User.deleteOne({ _id: req.params.id }).then((result) => {
      console.log("here after", result)
      if (result.deletedCount == 1) {
        res.json({ msg: " delete ok" });
      } else {
        res.json({ msg: " delete not ok" });
      }
    });
  }
  catch (err) {
    console.log(err);
  };
});
// business Logic:edit User
app.put("/users", (req, res) => {
  User.updateOne({ _id: req.body._id }, req.body).then((result) => {
    console.log("update", result)
    if (nModified == 1) {
      res.json({ msg: " update ok" });
    } else {
      res.json({ msg: " update not ok" });

    }
  });

});
// business logic :search user
app.post("/users/tabUser", (req, res) => {
  console.log("here into bl:get user by name ", req.body);
  User.find({ adress: req.body.search}).then(
    (doc) => {
      res.json({ user: doc });
    });

});

//BUSINESS LOGIC course Service*****

// business Logic:Get All courses
app.get("/courses", (req, res) => {
  console.log("here into bl:get all courses ", req.body);
  Course.find().populate("users").then(
    (docs) => {
      res.json({ T: docs });
    });

});
// business Logic:Get course by id
app.get("/courses/:id", (req, res) => {
  console.log("here into bl:get course by id", req.params.id);
  Course.findById(req.params.id).then(
    (doc) => {
      res.json({ T: doc });
    });
});
// business logic: delete course
app.delete("/courses/:id", async (req, res) => {
  try {
    console.log("here into bl:delete course by id", req.params.id);
    await Course.deleteOne({ _id: req.params.id }).then((result) => {
      console.log("here after", result)
      if (result.deletedCount == 1) {
        res.json({ msg: " delete ok" });
      } else {
        res.json({ msg: " delete not ok" });
      }
    });
  }
  catch (err) {
    console.log(err);
  };
});
// business Logic:add course
app.post("/courses", multer({ storage: storageConfig }).single('avatar'), (req, res) => {
  console.log("here into bl:add course", req.body);
  Course.findOne({ name: req.body.name }).then((doc) => {
    if (doc) {
      res.json({ msg: "name course exist" });
    } else {
      (req.file) ?
        req.body.avatar = `http://localhost:3000/shortcut/${req.file.filename}` :
        req.body.avatar = `http://localhost:3000/shortcut/avatar.png`;
      let course = new Course(req.body);
      course.save();
      res.json({ msg: "is added course valid" });
    }
  });

});
// business Logic:edit course
app.put("/courses", (req, res) => {
  Course.updateOne({ _id: req.body._id }, req.body).then((result) => {
    console.log("update", result)
    if (nModified == 1) {
      res.json({ msg: " update ok" });
    } else {
      res.json({ msg: " update not ok" });

    }
  });

});
// business logic :search course
app.post("/courses/tabCourse", (req, res) => {
  console.log("here into bl:get course by name ", req.body);
  Course.find({ name: req.body.search }).then(
    (doc) => {
      res.json({ course: doc });
    });

});

//BUSINESS LOGIC event  Service*****

// business Logic:add event
app.post("/events", multer({ storage: storageConfig }).single('avatar'), (req, res) => {
  console.log("here into bl:add event", req.body);
  Event.findOne({ name: req.body.name }).then((doc) => {
    if (doc) {
      res.json({ msg: "name event exist" });
    } else {
      (req.file) ?
        req.body.avatar = `http://localhost:3000/shortcut/${req.file.filename}` :
        req.body.avatar = `http://localhost:3000/shortcut/avatar.png`;
      let event = new Event(req.body);
      event.save();
      res.json({ msg: "is added event valid" });
    }
  });

});
// business logic: delete event
app.delete("/events/:id", async (req, res) => {
  try {
    console.log("here into bl:delete event by id", req.params.id);
    await Event.deleteOne({ _id: req.params.id }).then((result) => {
      console.log("here after", result)
      if (result.deletedCount == 1) {
        res.json({ msg: " delete ok" });
      } else {
        res.json({ msg: " delete not ok" });
      }
    });
  }
  catch (err) {
    console.log(err);
  };
});
// business Logic:Get All events
app.get("/events", (req, res) => {
  console.log("here into bl:get all events ", req.body);
  Event.find().then(
    (docs) => {
      res.json({ T: docs });
    });

});
// business Logic:edit event
app.put("/events", (req, res) => {
  Event.updateOne({ _id: req.body._id }, req.body).then((result) => {
    console.log("update", result)
    if (nModified == 1) {
      res.json({ msg: " update ok" });
    } else {
      res.json({ msg: " update not ok" });

    }
  });

});
//BUSINESS LOGIC contact  Service*****

// business Logic:add contact
app.post("/contacts",  (req, res) => {
  console.log("here into bl:add contact", req.body);
 
  let contact = new Contact(req.body);
  contact.save();
  res.json({ msg: "is send message valid" });
});
// business Logic:Get All contacts
app.get("/contacts", (req, res) => {
  console.log("here into bl:get all contacts ", req.body);
  Contact.find().then(
    (docs) => {
      res.json({ T: docs });
    });

});
// business logic: delete contact
app.delete("/contacts/:id", async (req, res) => {
  try {
    console.log("here into bl:delete event by id", req.params.id);
    await Contact.deleteOne({ _id: req.params.id }).then((result) => {
      console.log("here after", result)
      if (result.deletedCount == 1) {
        res.json({ msg: " delete ok" });
      } else {
        res.json({ msg: " delete not ok" });
      }
    });
  }
  catch (err) {
    console.log(err);
  };
});
//BUSINESS LOGIC note  Service*****

// business Logic:add note
app.post("/notes",  (req, res) => {
  console.log("here into bl:add note", req.body);
  let note = new Note(req.body);
  note.users = note.users.concat(req.body.students);
  note.users = note.users.concat(req.body.teachers);
  note.save();
  res.json({ msg: "is add note valid" });
});
// business logic: delete note
app.delete("/notes/:id", async (req, res) => {
  try {
    console.log("here into bl:delete note by id", req.params.id);
    await Note.deleteOne({ _id: req.params.id }).then((result) => {
      console.log("here after", result)
      if (result.deletedCount == 1) {
        res.json({ msg: " delete ok" });
      } else {
        res.json({ msg: " delete not ok" });
      }
    });
  }
  catch (err) {
    console.log(err);
  };
});
// business Logic:edit note
app.put("/notes", (req, res) => {
  Note.updateOne({ _id: req.body._id }, req.body).then((result) => {
    console.log("update", result)
    if (nModified == 1) {
      res.json({ msg: " update ok" });
    } else {
      res.json({ msg: " update not ok" });

    }
  });

});
// business Logic:Get All notes
app.get("/notes", (req, res) => {
  console.log("here into bl:get all notes ", req.body);
  Note.find().populate("users").then(
    (docs) => {
      res.json({ T: docs });
    });

});

//make app importable from another files
module.exports = app;
