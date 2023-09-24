import { nanoid } from "nanoid/async";
import URL from "../../models/urlModel.js";

/**
 * Generate a short URL for a given original URL.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {void}
 */
export const shortUrl = (req, res, next) => {
  // console.log(id);/
  console.log(req.body.url);
  createId()
    .then((id) => {
      let url = new URL({
        originalUrl: req.body.url,
        shortUrl: id,
        user: req.userId,
      });
      return url.save();
    })
    .then((response) => {
      res.status(200).json({ success: true, shortUrl: `http://localhost:3000/${id}` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: true, message: "something went wrong" });
    });
};

/**
 * Retrieves the URL associated with the specified short URL.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {void}
 */
export const getUrl = (req, res, next) => {
  // console.log(req);
  URL.find({ shortUrl: req.params.urlId })
    .then((response) => {
      if (response.length == 0)
        return res.status(404).json({ message: "url not found" });
      res.redirect(response[0].originalUrl);
      // res.status(200).json(response[0].originalUrl);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
  //    res.send("hhhh");
  console.log(nanoid);
};

// custom url shortener
//TODO:serialize the req so that one request is processed at a time so that we do not have have custom url generated with same name
//since the request for custom url would be less so we can it not affect the user experience

export const shortUrlCustom = (req, res, next) => {
  // console.log(id);/
  console.log(req.body.url);
  console.log(req.body.urlId);
  // first find the custom url not exists
  setTimeout(() => {
    console.log("hello");
  }, 5000);
  URL.find({ shortUrl: req.body.urlId }).then((response) => {
    if (response.length == 0) {
      let url = new URL({
        originalUrl: req.body.url,
        shortUrl: req.body.urlId,
        user: req.userId,
      });
      return url.save()
    }
    else {
      console.log(response);
      res.status(500).json({ success: true, message: "url already exists" });
    }
  }).then((response) => {
      res.status(200).json({ success: true, shortUrl: `http://localhost:3000/${req.body.urlId}` });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: true, message: "something went wrong creating custom url" });
    });
};

/**
 * Creates an ID asynchronously.
 *
 * @return {string} The generated ID.
 */
async function createId() {
  try {
    const id = await nanoid(8);
    return id;
  } catch (error) {
    console.log(error);
  }
}