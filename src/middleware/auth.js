const adminAuthentication = (req, res, next) => {
  //
  const token = "xyz";
  const isAdminAuthValidation = token === "xyz";
  if (!isAdminAuthValidation) {
    res.status(404).send("unautherized admin request");
  } else {
    next();
  }
};

const userAuthentication = (req, res, next) => {
  //
  const authreq = "xyz";
  const authToken = "xyz";
  const authValidation = authreq === authToken;
  if (!authValidation) {
    res(404).send("unautherized user req");
  } else {
    next();
  }
};

module.exports = { adminAuthentication, userAuthentication };
