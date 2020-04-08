const logger = (param) => (store) => (next) => (action) => {
  console.log("LOGGING", action);

  return next(action);
};

export default logger;
