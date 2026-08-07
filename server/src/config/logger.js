const timestamp = () => new Date().toISOString();

const logger = {
  info(message) {
    console.log(
      `[${timestamp()}] [INFO] ${message}`
    );
  },

  success(message) {
    console.log(
      `[${timestamp()}] [SUCCESS] ${message}`
    );
  },

  warn(message) {
    console.warn(
      `[${timestamp()}] [WARNING] ${message}`
    );
  },

  error(message, error = null) {
    console.error(
      `[${timestamp()}] [ERROR] ${message}`
    );

    if (error) {
      console.error(error);
    }
  },
};

export default logger;