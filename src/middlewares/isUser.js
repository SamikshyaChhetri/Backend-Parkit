export const isUser = (req, res, next) => {
  console.log(JSON.stringify(req.cookies));
  next();
};
