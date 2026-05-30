const Notification = require(
  "../models/Notification"
);


// Create Notification Service
const createNotification = async ({
  userId,
  title,
  message,
  type = "system",
  link = "",
  relatedId = null,
}) => {

  try {

    const notification =
      await Notification.create({

        user: userId,

        title,

        message,

        type,

        link,

        relatedId,
      });

    return notification;

  } catch (error) {

    console.error(
      `Notification Error: ${error.message}`
    );

    throw new Error(
      "Failed to create notification"
    );
  }
};


module.exports = {
  createNotification,
};