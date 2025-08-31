// createReview.test.js
const { createReview } = require("../../controllers/reviewController");
const {Listing} = require("../../models/listing");
const {Review} = require("../../models/review");

jest.mock("../../models/listing");
jest.mock("../../models/review");

describe("createReview controller", () => {
  let req, res, mockList, mockReview;

  beforeEach(() => {
    req = {
      params: { id: "listing123" },
      body: { review: { content: "Great place!", rating: 5 } },
      user: { _id: "user789" },
      flash: jest.fn()
    };
    res = {
      redirect: jest.fn()
    };

    mockList = {
      reviews: [],
      save: jest.fn().mockResolvedValue({})
    };

    mockReview = {
      save: jest.fn().mockResolvedValue({})
    };

    // Mock the Listing & Review
    Listing.findById.mockResolvedValue(mockList);
    Review.mockImplementation(() => mockReview);
  });

  it("should create a review and add it to the listing", async () => {
    await createReview(req, res);

    // Expect Review constructor to be called with correct data
    expect(Review).toHaveBeenCalledWith({
      content: "Great place!",
      rating: 5,
      listId: "listing123",
      author: "user789"
    });

    // Expect Listing.findById called
    expect(Listing.findById).toHaveBeenCalledWith({ _id: "listing123" });

    // Expect review reference added to listing
    expect(mockList.reviews).toContain(mockReview);

    // Expect save calls
    expect(mockList.save).toHaveBeenCalled();
    expect(mockReview.save).toHaveBeenCalled();

    // Expect flash + redirect
    expect(req.flash).toHaveBeenCalledWith("success", "Review created!!!");
    expect(res.redirect).toHaveBeenCalledWith("/listing/listing123");
  });
});
