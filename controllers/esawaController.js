import FormData from "form-data";
import fetch from "node-fetch";

export const verifyPayment = async (req, res) => {
  try {
    const { amt, refID, oid } = req.body;
    var form = new FormData();
    form.append("amt", amt);
    form.append("rid", refID);
    form.append("pid", oid);
    form.append("scd", process.env.ESEWA_MERCHANT_CODE);

    const response = await fetch(process.env.ESEWA_URL + "/epay/transrec", {
      method: "POST",
      body: form,
    });

    const body = await response.text();

    console.log(body);

    if (body.includes("Success")) {
      console.log("Success");
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};
