const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Transfer = require("../models/Transfer");

const asyncHandler = require("../middleware/async");
// @desc Render home page
// @access public
exports.home = asyncHandler(async (req, res, next) => {
  res.render("personal-banking");
});
// @desc Render news page
// @access public
exports.news = asyncHandler(async (req, res, next) => {
  res.render("news/index");
});
// @desc Render career page
// @access public
exports.careers = asyncHandler(async (req, res, next) => {
  res.render("careers");
});
// @desc Render financial-calculators page
// @access public
exports.financialcalculators = asyncHandler(async (req, res, next) => {
  res.render("financial-calculators");
});
// @desc Render agric home page
// @access public
exports.agrichome = asyncHandler(async (req, res, next) => {
  res.render("agricultural-services/index");
});
// @desc Render locations page
// @access public
exports.locations = asyncHandler(async (req, res, next) => {
  res.render("locations");
});
// @desc Render login page
// @access public
exports.login = asyncHandler(async (req, res, next) => {
  res.render("login");
});
// @desc Render events page
// @access public
exports.events = asyncHandler(async (req, res, next) => {
  res.render("events/index");
});
// @desc Render about page
// @access public
exports.about = asyncHandler(async (req, res, next) => {
  res.render("about-us/index");
});
// @desc Render funds availability page
// @access public
exports.fundsavailability = asyncHandler(async (req, res, next) => {
  res.render("funds-availability/index");
});
// @desc Render online security page
// @access public
exports.onlinesecurity = asyncHandler(async (req, res, next) => {
  res.render("online-security/index");
});
// @desc Render home equity page
// @access public
exports.homeequity = asyncHandler(async (req, res, next) => {
  res.render("home-equity/index");
});
// @desc Render contact us page
// @access public
exports.contactus = asyncHandler(async (req, res, next) => {
  res.render("contact-us/index");
});
// @desc Render agric checking page
// @access public
exports.agricchecking = asyncHandler(async (req, res, next) => {
  res.render("agricultural-services/agricultural-checking/index");
});
// @desc Render equipment loans page
// @access public
exports.equiploans = asyncHandler(async (req, res, next) => {
  res.render("agricultural-services/equipment-loans/index");
});
// @desc Render farm management page
// @access public
exports.farmmanagement = asyncHandler(async (req, res, next) => {
  res.render("agricultural-services/farm-management/index");
});
// @desc Render operating lines of credit page
// @access public
exports.operatinglinesofcredit = asyncHandler(async (req, res, next) => {
  res.render("agricultural-services/operating-lines-of-credit/index");
});
// @desc Render real estate loans page
// @access public
exports.realestateloans = asyncHandler(async (req, res, next) => {
  res.render("agricultural-services/real-estate-loans/index");
});
// @desc Render real estate loans page
// @access public
exports.trustrealestate = asyncHandler(async (req, res, next) => {
  res.render("agricultural-services/trust-real-estate-planning/index");
});
// @desc Render agricultural loans page
// @access public
exports.agriculturalloans = asyncHandler(async (req, res, next) => {
  res.render("business-banking/agricultural-loans/index");
});
// @desc Render business checking page
// @access public
exports.businesschecking = asyncHandler(async (req, res, next) => {
  res.render("business-banking/business-checking/index");
});
// @desc Render business digital banking page
// @access public
exports.businessdigitalbanking = asyncHandler(async (req, res, next) => {
  res.render("business-banking/business-digital-banking/index");
});
// @desc Render commercial loans page
// @access public
exports.commercialloans = asyncHandler(async (req, res, next) => {
  res.render("business-banking/commercial-loans/index");
});
// @desc Render lines of credit page
// @access public
exports.linesofcredit = asyncHandler(async (req, res, next) => {
  res.render("business-banking/lines-of-credit/index");
});
// @desc Render merchant services page
// @access public
exports.merchantservices = asyncHandler(async (req, res, next) => {
  res.render("business-banking/merchant-services/index");
});
// @desc Render small business loans page
// @access public
exports.smallbusinessloans = asyncHandler(async (req, res, next) => {
  res.render("business-banking/small-business-loans/index");
});
// @desc Render treasury management page
// @access public
exports.treasurymanagement = asyncHandler(async (req, res, next) => {
  res.render("business-banking/treasury-management/index");
});
// @desc Render business credit cards page
// @access public
exports.businesscreditcards = asyncHandler(async (req, res, next) => {
  res.render("business-credit-cards/index");
});
// @desc Render card services page
// @access public
exports.cardservices = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/card-services/index");
});
// @desc Render cds page
// @access public
exports.cds = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/cds/index");
});
// @desc Render digital banking page
// @access public
exports.digitalbanking = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/digital-banking/index");
});
// @desc Render mobile banking page
// @access public
exports.mobilebanking = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/mobile-banking/index");
});
// @desc Render mobile market page
// @access public
exports.mobilemarket = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/mobile-market/index");
});
// @desc Render mortgages page
// @access public
exports.mortgages = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/mortgages/index");
});
// @desc Render move your money page
// @access public
exports.moveyourmoney = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/move-your-money/index");
});
// @desc Render personal checking page
// @access public
exports.personalchecking = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/personal-checking/index");
});
// @desc Render personal loans page
// @access public
exports.personalloans = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/personal-loans/index");
});
// @desc Render personal savings page
// @access public
exports.personalsavings = asyncHandler(async (req, res, next) => {
  res.render("personal-banking/personal-savings/index");
});
// @desc Render brokerage services page
// @access public
exports.brokerageservices = asyncHandler(async (req, res, next) => {
  res.render("trust-investments/brokerage-services/index");
});
// @desc Render investment management page
// @access public
exports.investmentmanagement = asyncHandler(async (req, res, next) => {
  res.render("trust-investments/investment-management/index");
});
// @desc Render iras page
// @access public
exports.iras = asyncHandler(async (req, res, next) => {
  res.render("trust-investments/iras/index");
});
// @desc Render retirement planning page
// @access public
exports.retirementplanning = asyncHandler(async (req, res, next) => {
  res.render("trust-investments/retirement-planning/index");
});
// @desc Render Account statement page
// @access public
exports.accountstatement = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  const transactions = await Transaction.find({user: userId}).sort({date: -1}).exec();
  res.render("Account Summary", {transactions} );
});
// @desc Render Account details page
// @access public
exports.accountdetails = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  const transactions = await Transaction.find({user: userId});
  res.render("Account details", {transactions});
});
// @desc Render Transfer money page
// @access public
exports.transfermoney = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  const transactions = await Transaction.find({user: userId});
  res.render("Transfer money", {transactions});
});
// @desc Render Brokerage page
// @access public
exports.brokerage = asyncHandler(async (req, res, next) => {
  res.render("Brokerage");
});
// @desc Render Security question page
// @access public
exports.securityquestion = asyncHandler(async (req, res, next) => {
  res.render("Security question");
});

// @desc Logs a user out
// @access public
exports.logout = asyncHandler(async (req, res, next) => {
  req.logout();
  res.redirect("login");
});
// @desc handles security question submission
// @access public
exports.securityanswer = asyncHandler(async (req, res, next) => {
  const { question1 , question2 } = req.body
  if (question1 == "1980 buick skylark" && question2 == "1984") {
     req.user.loginCount++
     await req.user.save()
     res.redirect("accountstatement")
  } else {
    console.log(question1, question2);
    res.render("Security question")
  }
});

// @desc handles client tranfer action
// @access public
exports.transfer = asyncHandler(async (req, res, next) => {
  const {
    receiverBank,
    receiverName,
    accountNumber,
    routingNumber,
    paymentAmount,
    transferOption,
    description,
  } = req.body
  if(req.body.accountNumber == req.user.approvedAccount){
    const user = await User.findById(req.user._id.toString())
    user.accountBalance = user.accountBalance - paymentAmount
    await user.save()
    await Transfer.create({...req.body, user: req.user._id.toString()})
    const ref = `#IB${Math.floor(Math.random() * 100000000)}`;
    const refNo = ref.slice(0,7)
    await Transaction.create({amount: paymentAmount, description, type: "Debit", date: new Date(), user: req.user._id.toString(), refNo})
    res.send({success: true})
  } else{
    await Transfer.create({...req.body, user: req.user._id.toString()})
    res.send({success: false})
  }
});
