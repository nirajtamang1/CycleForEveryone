export const verifyPayment = async (req, res, next) => {
  try {
    const { amt, oid } = req.body;
    var form = new FormData();
    form.append("amt", amt);
    form.append("pid", oid);
    form.append("scd", process.env.ESEWA_MARCHANT_CODE);
    const response = await fetch(process.env.ESEWA_URL + "epay/transrec", {
      method: "POST",
      body: "form",
    });
    const body = await response.text();
    console.log(body);
    if (body.includes("Success")) {
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};
