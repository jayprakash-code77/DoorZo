// destroyReview.test.js
const { destroyReview } = require("../controllers/reviewController");
const {Listing} = require("../models/listing");
const {Review}= require("../models/review");

jest.mock("../models/listing");
jest.mock("../models/review");

describe("destroyReview controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { id: "listing123", reviewId: "review456" },
      flash: jest.fn()
    };
    res = {
      redirect: jest.fn()
    };
  });

  it("should delete a review and redirect", async () => {
    // mock DB methods
    Listing.findByIdAndUpdate.mockResolvedValue({});
    Review.findByIdAndDelete.mockResolvedValue({ _id: "review456" });

    await destroyReview(req, res);

    // expectations
    expect(Listing.findByIdAndUpdate).toHaveBeenCalledWith(
      "listing123",
      { $pull: { reviews: "review456" } }
    );
    expect(Review.findByIdAndDelete).toHaveBeenCalledWith("review456");
    expect(req.flash).toHaveBeenCalledWith("success", "Review deleted!!!");
    expect(res.redirect).toHaveBeenCalledWith("/listing/listing123");
  });
});
