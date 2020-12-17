const router = require("express").Router();
const User = require("../models/User")
const {
  home,
  agrichome,
  agricchecking,
  careers,
  financialcalculators,
  locations,
  login,
  equiploans,
  farmmanagement,
  operatinglinesofcredit,
  realestateloans,
  trustrealestate,
  agriculturalloans,
  businesschecking,
  businessdigitalbanking,
  commercialloans,
  linesofcredit,
  merchantservices,
  smallbusinessloans,
  treasurymanagement,
  businesscreditcards,
  events,
  about,
  fundsavailability,
  homeequity,
  onlinesecurity,
  cardservices,
  cds,
  digitalbanking,
  mobilebanking,
  mobilemarket,
  mortgages,
  moveyourmoney,
  personalchecking,
  personalloans,
  personalsavings,
  brokerageservices,
  investmentmanagement,
  iras,
  retirementplanning,
  news,
  accountdetails,
  accountstatement,
  transfermoney,
  logout,
  transfer,
  brokerage,
  securityquestion,
  securityanswer
} = require("../controllers/index");
const asyncHandler = require("../middleware/async");
const passport = require("passport");

router.route("/").get(home);
router.route("/index").get(home);
router.route("/careers").get(careers);
router.route("/login").get(login);
router.route("/news").get(news);
router.route("/events").get(events);
router.route("/about-us").get(about);
router.route("/financial-calculators").get(financialcalculators);
router.route("/brokerage-services").get(brokerageservices);
router.route("/investment-management").get(investmentmanagement);
router.route("/iras").get(iras);
router.route("/retirement-planning").get(retirementplanning);
router.route("/agricultural-services").get(agrichome);
router.route("/agricultural-checking").get(agricchecking);
router.route("/locations").get(locations);
router.route("/equipment-loans").get(equiploans);
router.route("/farm-management").get(farmmanagement);
router.route("/operating-lines-of-credit").get(operatinglinesofcredit);
router.route("/real-estate-loans").get(realestateloans);
router.route("/trust-real-estate-planning").get(trustrealestate);
router.route("/agricultural-loans").get(agriculturalloans);
router.route("/business-checking").get(businesschecking);
router.route("/business-digital-banking").get(businessdigitalbanking);
router.route("/commercial-loans").get(commercialloans);
router.route("/lines-of-credit").get(linesofcredit);
router.route("/merchant-services").get(merchantservices);
router.route("/small-business-loans").get(smallbusinessloans);
router.route("/treasury-management").get(treasurymanagement);
router.route("/business-credit-cards").get(businesscreditcards);
router.route("/funds-availability").get(fundsavailability);
router.route("/home-equity").get(homeequity);
router.route("/online-security").get(onlinesecurity);
router.route("/card-services").get(cardservices);
router.route("/cds").get(cds);
router.route("/digital-banking").get(digitalbanking);
router.route("/mobile-banking").get(mobilebanking);
router.route("/mobile-market").get(mobilemarket);
router.route("/mortgages").get(mortgages);
router.route("/move-your-money").get(moveyourmoney);
router.route("/personal-checking").get(personalchecking);
router.route("/personal-loans").get(personalloans);
router.route("/personal-savings").get(personalsavings);
router.route("/accountdetails").get(accountdetails);
router.route("/accountstatement").get(accountstatement);
router.route("/transfermoney").get(transfermoney);
router.route("/securityquestion").get(securityquestion);
router.route("/brokerage").get(brokerage);
router.route("/logout").get(logout);
router.route("/transfermoney").post(transfer);
router.route("/securityanswer").post(securityanswer);
router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({accountNumber: req.body.accountNumber})
    if (user.loginCount < 1) {
      passport.authenticate("local", {
        successRedirect: "/securityquestion",
        failureRedirect: "/login",
        failureFlash: false,
      })(req, res, next);
    } else {
      passport.authenticate("local", {
        successRedirect: "/accountstatement",
        failureRedirect: "/login",
        failureFlash: false,
      })(req, res, next);
    }
  })
);

module.exports = router;
