const TimeSlot = require('../model/timeSlotSchema');
const book = async (req, res) => {
  const { date, startTime, endTime } = req.body;

  // Find any conflicting slot
  const conflictingSlot = await TimeSlot.findOne({
    date,
    booked: true,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  });

  if (conflictingSlot) {
    return res.status(400).json({ message: 'Time slot is already booked' });
  }

  // Create and save the new time slot
  const timeSlot = new TimeSlot({ date, startTime, endTime, booked: true });
  await timeSlot.save();

  res.status(200).json({ message: 'Time slot booked successfully' });
};
const booked= async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: 'Date query parameter is required' });
  }

  const bookedSlots = await TimeSlot.find({ date, booked: true });

  res.status(200).json(bookedSlots);
}

  module.exports={book,booked}