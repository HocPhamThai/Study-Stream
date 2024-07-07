const StudyRoomSession = require('../models/StudyRoomSession');

const enterRoom = async (req, res) => {
  const { roomId, userId } = req.body;
  try {
    const session = new StudyRoomSession({ roomId, userId, enterTime: new Date() });
    await session.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error entering room:', error);
    res.status(500).json({ success: false });
  }
};

const exitRoom = async (req, res) => {
  const { roomId, userId } = req.body;
  try {
    const session = await StudyRoomSession.findOne({ roomId, userId, exitTime: null });
    if (session) {
      const exitTime = new Date();
      session.exitTime = exitTime;
      session.duration = (exitTime - session.enterTime) / 1000; // duration in seconds
      await session.save();
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error exiting room:', error);
    res.status(500).json({ success: false });
  }
};

module.exports = { enterRoom, exitRoom };
