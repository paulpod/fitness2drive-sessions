/*  - - - - - - - - - - - - - - - - -  */
/*  QUESTION 11 - previous-medication  */
router.get('/ep-flowq11', function (req, res) {

	var moment = require('moment');

	var vars = req.query;
	var drugname1 = req.query.drugname1;

	// Start date
	var startday1 = req.query.startday1;
	var startmonth1 = req.query.startmonth1;
	var startyear1 = req.query.startyear1;
	// Combine variables into one
	var startdate1 = moment(startyear1 + '-' + startmonth1 + '-' +  startday1).format("D MMMM YYYY");

	// End date
	var endday1 = req.query.endday1;
	var endmonth1 = req.query.endmonth1;
	var endyear1 = req.query.endyear1;
	// Combine variables into one
	var enddate1 = moment(endyear1 + '-' + endmonth1 + '-' +  endday1).format("D MMMM YYYY");
	
	var q11answer1 = drugname1 + " " + startdate1 + " " + enddate1;

	console.log(q11answer1);
	console.log(startdate1);
	console.log(enddate1);

	res.render('epilepsy/q12', {'vars' : vars, 'drugname1' : drugname1, 'startdate1' : startdate1, 'enddate1' : enddate1, 'q11answer1' : q11answer1});
});



/*  - - - - - - - - - - - - - - - - -  */
/*  QUESTION 11 a - previous-medication  */
router.get('/ep-flowq11a', function (req, res) {

	var moment = require('moment');

	var vars = req.query;
	var drugname1 = req.query.drugname1;

	// Start date
	var startday1 = req.query.startday1;
	var startmonth1 = req.query.startmonth1;
	var startyear1 = req.query.startyear1;
	// Combine variables into one
	var startdate1 = moment(startyear1 + '-' + startmonth1 + '-' +  startday1).format("D MMMM YYYY");

	// End date
	var endday1 = req.query.endday1;
	var endmonth1 = req.query.endmonth1;
	var endyear1 = req.query.endyear1;
	// Combine variables into one
	var enddate1 = moment(endyear1 + '-' + endmonth1 + '-' +  endday1).format("D MMMM YYYY");
	
	var q11answer1 = drugname1 + " " + startdate1 + " " + enddate1;

	// Variables for shorter date
	var sd1 = moment(startdate1).format("D M YY");
	var ed1 = moment(enddate1).format("D M YY");
	
	console.log(q11answer1);
	console.log(startdate1);
	console.log(enddate1);

	// res.render('epilepsy/q11a', {'vars' : vars, 'drugname1' : drugname1, 'startdate1' : startdate1, 'enddate1' : enddate1, 'sd1' : sd1, 'ed1' : ed1, 'q11answer1' : q11answer1,});
	res.render('epilepsy/q11a', {'vars' : vars, 'sd1' : sd1, 'ed1' : ed1, 'q11answer1' : q11answer1,});
});





/*  - - - - - - - - - - - - - - - - -  */
/*  QUESTION 11 b - previous-medication  */
router.get('/ep-flowq10b', function (req, res) {

	var vars = req.query;

	var moment = require('moment');

	var q10answer2 = req.query.q10answer2;

	var startday2 = req.query.startday2;
	var startmonth2 = req.query.startmonth2;
	var startyear2 = req.query.startyear2;
	var startdate2 = moment(
		startyear2 + '-' + startmonth2 + '-' +  startday2).format("D MMMM YYYY");

	var endday2 = req.query.endday2;
	var endmonth2 = req.query.endmonth2;
	var endyear2 = req.query.endyear2;
	var enddate2 = moment(
		endyear2 + '-' + endmonth2 + '-' +  endday2).format("D MMMM YYYY");

	var sd2 = moment(startdate2).format("D M YY");
	var ed2 = moment(enddate2).format("D M YY");

	res.render('epilepsy/q10b', {'vars' : vars,
		'q10answer2' : q10answer2,
		'startdate2' : startdate2, 'enddate2' : enddate2,
		'sd2' : sd2, 'ed2' : ed2});
});


/*  - - - - - - - - - - - - - - - - -  */
/*  QUESTION 11a - previous-medication  */
router.get('/ep-flowq10c', function (req, res) {

	var vars = req.query;

	var moment = require('moment');

	var q10answer3 = req.query.q10answer3;

	var startday3 = req.query.startday3;
	var startmonth3 = req.query.startmonth3;
	var startyear3 = req.query.startyear3;
	var startdate3 = moment(
		startyear3 + '-' + startmonth3 + '-' +  startday3).format("D MMMM YYYY");

	var endday3 = req.query.endday3;
	var endmonth3 = req.query.endmonth3;
	var endyear3 = req.query.endyear3;
	var enddate3 = moment(
		endyear3 + '-' + endmonth3 + '-' +  endday3).format("D MMMM YYYY");

	// var startday2 = req.query.day;
	// var startmonth2 = req.query.month;
	// var startyear2 = req.query.year;

	// var endday2 = req.query.day;
	// var endmonth2 = req.query.month;
	// var endyear2 = req.query.year;

	// var startdate2 = moment(
		// startyear2 + '-' + startmonth2 + '-' +  startday2).format("DDMMYYYY");
	// var enddate2 = moment(
		// endyear2 + '-' + endmonth2 + '-' +  endday2).format("DDMMYYYY");
	// var date2 = moment(startyear2 + '-' + startmonth2 + '-' +  startday2).format("DDMMYYYY");
	
	res.render('epilepsy/q11', {'vars' : vars,
		'q10answer3' : q10answer3,
		'startdate3' : startdate3, 'enddate3' : enddate3});
});


/*  - - - - - - - - - - - - - - - -   */
/*  QUESTION 12 - current-medication  */
router.get('/ep-flowq11', function (req, res) {

	var vars = req.query;
	var q11answer = req.query.q11answer;

	res.render('epilepsy/q12', {'vars' : vars, 'q11answer' : q11answer});
});


/*  - - - - - - - - - - - - - - - -   */
/*  QUESTION 13 - drowsy-confused-medication  */
router.get('/ep-flowq12', function (req, res) {

	var vars = req.query;
	var q12answer = req.query.q12answer;

	res.render('epilepsy/q13', {'vars' : vars, 'q12answer' : q12answer});

	// if (q12answer == "Yes") {
	// 	res.render('epilepsy/revoke', {'vars' : vars, 'q12answer' : q12answer});
	// }
	// else if (q12answer == "No") {
	// 	res.render('epilepsy/q10', {'vars' : vars, 'q12answer' : q12answer});
	// }
	// else
	// 	res.render('epilepsy/error', {'vars' : vars, 'q12answer' : q12answer});
});


/*  - - - - - - - - - - - - - - - - -   */
/*  QUESTION 14 - epilepsy-declaration  */
router.get('/ep-flowq13', function (req, res) {

	var vars = req.query;
	var q13answer = req.query.q13answer;

	if (q13answer == "agree") {
		res.render('epilepsy/q14', {'vars' : vars, 'q13answer' : q13answer});
	}
	else
		res.render('epilepsy/q17', {'vars' : vars, 'q13answer' : q13answer});
});


/*  - - - - - - - - - - - - - - - -  */
/*  QUESTION 15 - medical-consent-1  */
router.get('/ep-flowq14', function (req, res) {

	var vars = req.query;
	var q14answer = req.query.q14answer;
	
	if (q14answer == "agreed") {
		res.render('epilepsy/q15', {'vars' : vars, 'q14answer' : q14answer});
	}
	else
		res.render('epilepsy/q14a', {'vars' : vars, 'q14answer' : q14answer});
});


/*  - - - - - - - - - - - - - - - -  */
/*  QUESTION 15A - medical-consent-1  */
router.get('/ep-flowq14a', function (req, res) {

	var vars = req.query;
	
	res.render('epilepsy/q17', {'vars' : vars});
});


/*  - - - - - - - - - - - - - - - -  */
/*  QUESTION 15B - medical-consent-2  */
router.get('/ep-flowq15', function (req, res) {

	var vars = req.query;
	var q15Aanswer = req.query.q15Aanswer;
	var q15Banswer = req.query.q15Banswer;

	res.render('epilepsy/q16', {'vars' : vars,
		'q15Aanswer' : q15Aanswer, 'q15Banswer' : q15Banswer});
});


/*  --------------------------------  */
/*  QUESTION 15C - consultant-details  */
router.get('/ep-flowq16', function (req, res) {

	var vars = req.query;
	var drname = req.query.drname;
	var surgname = req.query.surgname;
	var drpostcode = req.query.drpostcode;
	var drphone = req.query.drphone;
	
	res.render('epilepsy/q17', {'vars' : vars,
		'drname' : drname, 'surgname' : surgname,
		'drpostcode' : drpostcode, 'drphone' : drphone});
});


/*  ---------------------------------  */
/*  QUESTION 16 - application-summary  */
router.get('/ep-flowq17', function (req, res) {

	var vars = req.query;

	res.render('epilepsy/q18', {'vars' : vars});
});










/* - - - - - - - - - - - - - - - - -  -  */
/* Pass nextpage for Basic Flow control  */
router.get('/basic-flow', function (req, res) {
/* line above starts a new JS function, receives the form action event from the webpage */

	var next = req.query.nextlink;
	var vars = req.query;
	/* this line pulls out the name of the next page that was sent with the weblink */

	res.render('epilepsy/' + next, {'vars' : vars});
	/* this line renders a new page based on the HTML of the file sent as the next page */

});
/* ends the app.get javascript function */



/* - - - - - - - - - - - - - - - - - - - */
/* Chooser for Basic Branching control   */


router.get('/examples/elements/basic-branch', function (req, res) {

var next = req.query.nextlink;
/* this line pulls out the filename of the next page, sent with the weblink */

var branch = req.query.branch;
/* this line pulls out the name of the branch from the input buttons */

res.render('examples/elements/' + next + '-' + branch, {});
/* this line renders a new page based on the HTML of the filename + branchname  */


});
    /* ends the app.get javascript function */