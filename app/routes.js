var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});


// Example route: Passing data into a page
router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name' : 'Foo' });
});

// add your routes here


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



/* - - - - - - - - - - - */
/* Generic router script */
router.get('/ep-flow', function (req, res) {

	// get the next page
    var question = req.query.question;

    // as long as it's not trying to return from a check/change
    //if(/chexx/.test(next)){
    //  var next = 'vm-acqpp/vm-acquire-check';
    //}

    // get all the other variables from the page
    var pagevars = req.query;

    // get the older variables from the session
    var objectMerge = require('object-merge');
    var sess = req.session;
    sessvars = sess.vars;


    // merge the sets of variables from
    // the page and the session
    var merged = objectMerge(sessvars, pagevars);
    sess.vars = merged;



	switch(question)
    {
    
    case "q1":
    // Condition
    var q1answer = merged.q1answer;

    if (q1answer == "epilepsy") {var next = 'q2';} else {var next = 'non-notifiable';}
    break;


    case "q2":
    // Condition description 
    var q2answer = merged.q2answer;

    if (q2answer == "Epilepsy") {var next = 'q3';}
    else if (q2answer == "Multiple") {var next = 'q3';}
    else if (q2answer == "First") {var next = 'feus';}
    break;


    case "q3":
    // Seizure type
	var q3answer = merged.q3answer;

	if (q3answer == "Asleep") {var next = 'q4';}
	else if (q3answer == "Awake") {var next = 'awake';}
	else if (q3answer == "Mixed") {var next = 'mixed';}
	break;


    case "q4":
    // seizure-cause 
    var q4answer = merged.q4answer;

	if (q4answer == "have") {var next = 'q5';}
	else if (q4answer == "have not") {var next ='verify/verify-1';}
	else {var next = 'error';}
	break;


    case "q5":
    // alcohol-dependence 
	var next = 'q6';
	break;


    case "q6":
    // drug-dependence 
	var next = 'verify/verify-1';
	break;


    case "q7":
    // CONFIRM ADDRESS 
	var q7answer = merged.q7answer;

	if (q7answer == "Yes") {var next = 'q8';}
	else {var next ='q7a';}
	break;


    case "q7a":
    // CHANGE ADDRESS 
	var next = 'q7b'
	break;


    case "q7b":
    // EMAIL CONFIRMATION 
	var next = 'epilepsy/q8';
	break;


    case "q8":
    // first-seizure-date
    var moment = require('moment');

	var day = req.query.day;
	var month = req.query.month;
	var year = req.query.year;
	var date = moment(year + '-' + month + '-' +  day).format("D MMMM YYYY");
	var q8answer = date;

	var now = moment(new Date());
	var today = now.format("D MMMM YYYY");

	var fiveago = moment().subtract(5, "years").format("D MMMM YYYY");
	var oneago = moment().subtract(1, "years").format("D MMMM YYYY");

	// If less than 1 year ago
	if (moment(q8answer).isAfter(oneago)) {
		var next = 'q17a';

	// If more than 1 year ago
	} else {var next = '/q9';}
    break;


    case "q9":
    // recent-seizure-date
    var moment = require('moment');

	var day = req.query.day;
	var month = req.query.month;
	var year = req.query.year;
	var date = moment(year + '-' + month + '-' +  day).format("D MMMM YYYY");
	var q9answer = date;

	var now = moment(new Date());
	var today = now.format("D MMMM YYYY");

	var fiveago = moment().subtract(5, "years").format("D MMMM YYYY");
	var oneago = moment().subtract(1, "years").format("D MMMM YYYY");

	// If less than one year ago
	if (moment(q9answer).isAfter(oneago)) {
		var next = 'q17a';
	
	// If more than 1 less than 5 years
	} else if (moment(q9answer).isAfter(fiveago)) {
		var next = 'q11';
	
	// If more than 5 years
	} else {var next = 'q10';}

    break;


    case "q10":
    // other events
    var q10answer = merged.q10answer;
	
	if (q10answer == "have") {
		var next = 'blackout';
	}
	else if (q10answer == "have not") {
		var next = 'q11';
	}
    break;


    case "q11":
    // other events .2
    var moment = require('moment');

	//var vars = req.query;
	var drugname1 = merged.drugname1;

	// Start date
	var startday1 = merged.startday1;
	var startmonth1 = merged.startmonth1;
	var startyear1 = merged.startyear1;
	// Combine variables into one
	var startdate1 = moment(startyear1 + '-' + startmonth1 + '-' +  startday1).format("D MMMM YYYY");

	// End date
	var endday1 = merged.endday1;
	var endmonth1 = merged.endmonth1;
	var endyear1 = merged.endyear1;
	// Combine variables into one
	var enddate1 = moment(endyear1 + '-' + endmonth1 + '-' +  endday1).format("D MMMM YYYY");
	
	var q11answer = drugname1 + " " + startdate1 + " " + enddate1;

	console.log(q11answer);
	console.log(startdate1);
	console.log(enddate1);
	// !! Wayne you may need to put these new variables created after the session/vars/merge 
	// !! directly into the session somehow...

	var next = 'q12';
    break;


    default:
      // code if nothing works
    }




	res.render('epilepsy/' + next, {'vars' : merged, });
    });


/*  - - - - - - - - - - - - - -  */
/*  QUESTION 1 - your-condition  */
router.get('/ep-flowq1', function (req, res) {

	var vars = req.query;
	var q1answer = req.query.q1answer;

	if (q1answer == "epilepsy") {
		res.render('epilepsy/q2', {'vars' : vars, 'q1answer' : q1answer});
	} else
		res.render('epilepsy/non-notifiable', {'vars' : vars, 'q1answer' : q1answer});
});


/*  - - - - - - - - - - - - - - - -  */
/*  QUESTION 2 - describe-condition  */
router.get('/ep-flowq2', function (req, res) {

	var vars = req.query;
	var q2answer = req.query.q2answer;

	if (q2answer == "Epilepsy") {
		res.render('epilepsy/q3', {'vars' : vars, 'q2answer' : q2answer});
	}
	else if (q2answer == "Multiple") {
		res.render('epilepsy/q3', {'vars' : vars, 'q2answer' : q2answer});
	}
	else (q2answer == "First")
		res.render('epilepsy/feus', {'vars' : vars, 'q2answer' : q2answer});
	
});


/*  - - - - - - - - - - - - -  */
/*  QUESTION 3 - seizure-type  */
router.get('/ep-flowq3', function (req, res) {

	var vars = req.query;
	var q3answer = req.query.q3answer;

	if (q3answer == "Asleep") {
		res.render('epilepsy/q4', {'vars' : vars, 'q3answer' : q3answer});
	}
	else if (q3answer == "Awake") {
		res.render('epilepsy/awake', {'vars' : vars, 'q3answer' : q3answer});
	}
	else (q3answer == "Mixed")
		res.render('epilepsy/mixed', {'vars' : vars, 'q3answer' : q3answer});
});


/*  - - - - - - - - - - - - -   */
/*  QUESTION 4 - seizure-cause  */
router.get('/ep-flowq4', function (req, res) {

	var vars = req.query;
	var q4answer = req.query.q4answer;

	if (q4answer == "have") {
		res.render('epilepsy/q5', {'vars' : vars, 'q4answer' : q4answer});}
	else if (q4answer == "have not") {
		res.render('epilepsy/verify/verify-1', {'vars' : vars, 'q4answer' : q4answer});
	}
	else
		res.render('epilepsy/error', {'vars' : vars, 'q4answer' : q4answer});
});


/*  - - - - - - - - - - - - - - -    */
/*  QUESTION 5 - alcohol-dependence  */
router.get('/ep-flowq5', function (req, res) {

	var vars = req.query;
	var q5answer = req.query.q5answer;

	res.render('epilepsy/q6', {'vars' : vars, 'q5answer' : q5answer});

	// if (q5answer == "Yes") {
	// 	res.render('epilepsy/q6', {'vars' : vars, 'q5answer' : q5answer});
	// }
	// else if (q5answer == "No") {
	// 	res.render('epilepsy/q6', {'vars' : vars, 'q5answer' : q5answer});
	// }
	// else
	// 	res.render('epilepsy/error', {});
});


/*  - - - - - - - - - - - - - -   */
/*  QUESTION 6 - drug-dependence  */
router.get('/ep-flowq6', function (req, res) {

	var vars = req.query;
	var q6answer = req.query.q6answer;

	res.render('epilepsy/verify/verify-1', {'vars' : vars, 'q6answer' : q6answer});

	// if (q6answer == "Yes") {
	// 	res.render('epilepsy/verify/verify-2', {'vars' : vars, 'q6answer' : q6answer});
	// }
	// else if (q6answer == "No") {
	// 	res.render('epilepsy/verify/verify-2', {'vars' : vars, 'q6answer' : q6answer});
	// }
	// else
	// 	res.render('epilepsy/error', {'vars' : vars, 'q6answer' : q6answer});
});


/*  - - - - - - - - - - - - - -   */
/*  QUESTION 7 - CONFIRM ADDRESS  */	
router.get('/ep-flowq7', function (req, res) {

	var vars = req.query;
	var q7answer = req.query.q7answer;

	console.log(q7answer);

	if (q7answer == "Yes") {
		res.render('epilepsy/q8', {'vars' : vars, 'q7answer' : q7answer});
	}
	else
		res.render('epilepsy/q7a', {'vars' : vars, 'q7answer' : q7answer});
});


/*  - - - - - - - - - - - - - -   */
/*  QUESTION 7A - CHANGE ADDRESS  */	
router.get('/ep-flowq7a', function (req, res) {

	var vars = req.query;
	var address1 = req.query.address1;
	var address2 = req.query.address2;
	var posttown = req.query.posttown;
	var postcode = req.query.postcode;

	var q7answerA = address1 + "<br>" + address2 + "<br>" + posttown + "<br>" + postcode;
	console.log(q7answerA);

	res.render('epilepsy/q7b', {'vars' : vars, 'q7answerA' : q7answerA});
});


/*  - - - - - - - - - - - - - - - -   */
/*  QUESTION 7B - EMAIL CONFIRMATION  */	
router.get('/ep-flowq7b', function (req, res) {

	var vars = req.query;
	var q7answerB = req.query.q7answerB;
	var email = req.query.email;

	console.log(q7answerB);
	console.log(email);

	res.render('epilepsy/q8', {'vars' : vars, 'q7answerB' : q7answerB, 'email' : email});
	// res.render('epilepsy/error', {});
});


/*  - - - - - - - - - - - - - - - -  */
/*  QUESTION 8 - first-seizure-date  */
router.get('/ep-flowq8', function (req, res) {

	var vars = req.query;

	var moment = require('moment');

	var day = req.query.day;
	var month = req.query.month;
	var year = req.query.year;
	var date = moment(year + '-' + month + '-' +  day).format("D MMMM YYYY");
	var q8answer = date;

	var now = moment(new Date());
	var today = now.format("D MMMM YYYY");

	var fiveago = moment().subtract(5, "years").format("D MMMM YYYY");
	var oneago = moment().subtract(1, "years").format("D MMMM YYYY");

	// var gap5 = moment(q8answer).diff(fiveago, 'days');
	// var gap1 = moment(q8answer).diff(oneago, 'days');

	// If less than 1 year ago
	if (moment(q8answer).isAfter(oneago)) {
		res.render('epilepsy/q17a', {'vars' : vars, 'q8answer' : q8answer});
		// res.render('epilepsy/revoke', {'vars' : vars, 'q8answer' : q8answer});
	
	// If more than 1 year ago
	} else
		res.render('epilepsy/q9', {'vars' : vars, 'q8answer' : q8answer});
});


/*  - - - - - - - - - - - - - - - -  */
/*  QUESTION 9 - recent-seizure-date  */
router.get('/ep-flowq9', function (req, res) {

	var vars = req.query;

	var moment = require('moment');

	var day = req.query.day;
	var month = req.query.month;
	var year = req.query.year;
	var date = moment(year + '-' + month + '-' +  day).format("D MMMM YYYY");
	var q9answer = date;

	var now = moment(new Date());
	var today = now.format("D MMMM YYYY");

	var fiveago = moment().subtract(5, "years").format("D MMMM YYYY");
	var oneago = moment().subtract(1, "years").format("D MMMM YYYY");

	// var gap5 = moment(q9answer).diff(fiveago, 'days');
	// var gap1 = moment(q9answer).diff(oneago, 'days');

	// If less than one year ago
	if (moment(q9answer).isAfter(oneago)) {
		res.render('epilepsy/q17a', {'vars' : vars, 'q9answer' : q9answer});
		// res.render('epilepsy/revoke', {'vars' : vars, 'q9answer' : q9answer});
	
	// If more than 1 less than 5 years
	} else if (moment(q9answer).isAfter(fiveago)) {
		res.render('epilepsy/q11', {'vars' : vars, 'q9answer' : q9answer});
	
	// If more than 5 years
	} else
		res.render('epilepsy/q10', {'vars' : vars, 'q9answer' : q9answer});
});


/*  - - - - - - - - - - - - -  */
/*  QUESTION 10 - other-events  */
router.get('/ep-flowq10', function (req, res) {

	var vars = req.query;
	var q10answer = req.query.q10answer;
	
	if (q10answer == "have") {
		res.render('epilepsy/blackout', {'vars' : vars, 'q10answer' : q10answer});
	}
	else (q10answer == "have not")
		res.render('epilepsy/q11', {'vars' : vars, 'q10answer' : q10answer});
});


/*  - - - - - - - - - - - - -  */
/*  QUESTION 11 - other-events  */
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
	
	var q11answer = drugname1 + " " + startdate1 + " " + enddate1;

	console.log(q11answer);
	console.log(startdate1);
	console.log(enddate1);

	res.render('epilepsy/q12', {'vars' : vars, 'q11answer' : q11answer});
});


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
	
	var q11answer = drugname1 + " " + startdate1 + " " + enddate1;

	console.log(q11answer);
	console.log(startdate1);
	console.log(enddate1);

	res.render('epilepsy/q11a', {'vars' : vars, 'q11answer' : q11answer});
});














module.exports = router;