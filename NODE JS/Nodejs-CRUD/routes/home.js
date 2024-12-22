const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Club.find().exec();
    res.render('home', { clubs: docs });
  } catch (err) {
    console.log("Something wrong with MongoDB (can't retrieve)", err);
    res.render('home', { clubs: [] }); // Trả về một mảng trống hoặc xử lý lỗi theo ý của bạn
  }
});



router.post('/add', async (req, res, next) => {
//   const name = req.body.name;
//   const players = req.body.players;
//   const coach = req.body.coach;
  const {name,players,coach} = req.body;

  console.log(name, players, coach);

  const uclClub = new Club({
    name,
    players,
    coach
  });

  try {
    await uclClub.save(); // Sử dụng `await` với `save()`
    console.log("Data is recorded successfully");
    res.send("Data is recorded successfully");
  } catch (err) {
    console.log("Something went wrong to save data to the database", err);
    res.status(500).send("Something went wrong to save data to the database");
  } 
});

 
router.get('/edit/:id', async (req, res, next) => {
  try {
    const updatedClub = await Club.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.render('edit', { club: updatedClub });
  } catch (err) {
    console.log("Can't update club", err);
    next(err);
  }
});

router.post('/edit/:id', async (req, res, next) => {
  try {
    await Club.findByIdAndUpdate(req.params.id, req.body).exec();
    res.redirect('/');
  } catch (err) {
    console.log("Can't update club", err);
    next(err);
  }
});

router.post('/delete/:id', async (req, res, next) => {
  try {
    const clubId = req.params.id;
    await Club.findByIdAndRemove(clubId).exec();
    console.log("Data is deleted successfully");
    res.redirect('/'); // Quay về trang chủ sau khi xóa thành công
  } catch (err) {
    console.log("Something went wrong to delete data from the database", err);
    res.status(500).send("Something went wrong to delete data from the database");
  }
});
 
router.get('/delete/:id', async (req, res, next) => {
  const clubId = req.params.id;

  try {
    await Club.findByIdAndDelete(clubId);
    console.log("Data is deleted successfully");
    res.redirect('/'); // Quay về trang chủ sau khi xóa thành công
  } catch (err) {
    console.log("Something went wrong to delete data from the database", err);
    res.status(500).send("Something went wrong to delete data from the database");
  }
});



module.exports = router;
