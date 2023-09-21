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
  createId().then((id) => {
    let url = new URL({
      originalUrl: req.body.url,
      shortUrl: id,
      user: req.userId
    })
    url
      .save()
      .then((response) => {
        res.status(200).json({ shortUrl: `http://localhost:3000/${id}` });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
      });
  }).catch((error) => { console });
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