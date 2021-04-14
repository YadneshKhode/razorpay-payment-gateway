const express = require("express");
const app = express();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
//whitelist here this is not safe
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const razorpay = new Razorpay({
  key_id: "rzp_test_Vja9sKOBjy7E5Z",
  key_secret: "rixAM6FbMl56iX7lUrAZ0yWj",
});

app.get("/", (req, res) => {
  res.status(200).send("Hii from server");
});

app.post("/verification", (req, res) => {
  const SECRET = "123456";
  console.log(req.body);

  const shasum = crypto.createHmac("sha256", SECRET);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  console.log(
    "digest = " +
      digest +
      "  " +
      "req.headers['x-razorpay-signature']  " +
      req.headers["x-razorpay-signature"]
  );

  if (digest === req.headers[x - razorpay - signature]) {
    console.log("request is legit");
  } else {
    console.log("request is not legit");
  }

  res.json({ status: "ok" });
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";
  const notes = "hey";
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount.toString(),
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Listening on port = ${port}`);
});
