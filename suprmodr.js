// ==UserScript==
// @name SuprModr
// @description Reddit Moderator(?) script. Parts and idea by /u/noeatnosleep, enhanced by /u/enim
// @include http://www.reddit.com/user/*
// @include http://www.reddit.com/r/*
// ==/UserScript==

var currentPage = document.URL;
var parsedPage = currentPage.split('/');
var modHash = null;
var currentUser = null;
var subreddit = null;
var commentIDs = [];
var topicIDs = [];
var subredditList = [];
var reportID = [];

var commentPage;	
commentPage = document.getElementsByClassName('comment');

function getHash(callback) {
    var query = new XMLHttpRequest();
    query.onreadystatechange = function () {
        if (query.readyState == 4) {
            var info = JSON.parse(query.responseText);
            modHash = info.data.modhash;
            callback();
        }
    }
    query.open('GET', 'http://www.reddit.com/api/me.json', true);
    query.send(null);
}

function generateToolbar () {
	$(document).find('#header')[0].style.marginTop='26px';
    var newToolbar = document.createElement("div");
	newToolbar.id = "newToolbar";
	document.body.insertBefore(newToolbar,document.body.firstChild);
	var subredditbar = document.getElementById('sr-header-area');
	newToolbar.style.cssText="border-bottom:1px solid gray;color:black;background:none 0% 0% / auto repeat scroll padding-box border-box rgb(240, 240, 240);font-family:verdana, arial, helvetica, sans-serif;font-size:12px;height:18px;padding:3px 0px 3px 6px;text-transform:uppercase;width:100%;z-index:+999999;position:fixed;top:0;a";
	newToolbar.style.paddingLeft = '6px';
    newToolbar.style.paddingTop = '3px';
    newToolbar.style.paddingBottom = '3px';
    newToolbar.style.top='0px';
	if (commentPage.length == 0) {
		newToolbar.innerHTML += " <a id=reportComment href='#'>REPORT POSTS</a> ";
	}
	else {
		newToolbar.innerHTML += "<a id=reportComment href='#'>REPORT COMMENTS</a> ";	
	}
	if (parsedPage[3] == 'user'){
		newToolbar.innerHTML += "<a id='upvoteAndOpen' href='#'> | UPVOTE AND OPEN </a> <a id='downvoteAndOpen' href='#'> | DOWNVOTE AND OPEN </a> <a id='reportUserToSpam' href='#'> | REPORT ON /R/SPAM </a>";
	}
	newToolbar.innerHTML += "| <a id='downvoteComment' href='#'>DOWNVOTER</a> | <a id='upvoteComment' href='#'>UPVOTER</a> ";
 }


function doStuff() {
    $('#reportComment').on('click',function(e) {
       for(var i = 0; i < reportID.length; i++) {reportItem(i, 3);}
    alert('All items on this page were reported.');
    });   
    $('#downvoteComment').on('click',function(e){
    	theDownvoter();
    });
    $('#upvoteComment').on('click',function(e){
    	theUpvoter();
    });
    $('#upvoteAndOpen').on('click',function(e){
    	clickYourUpvotes();
    });
    $('#downvoteAndOpen').on('click',function(e){
    	clickYourDownvotes();
    });
    $('#reportUserToSpam').on('click',function(e){
    	reportToSpam();
    });
}

function buildReportArray() {
	if (commentPage.length == 0) {
		var threads;
		threads = $('#siteTable').find('.thing');
		for (i = 0; i < threads.length; i++) {
			 reportID.push(threads[i].getAttribute('data-fullname'));
		}
	}
	else if (commentPage.length != 0) {
		var threads;
		threads = $('.commentarea').find('.thing');
		for (i = 0; i < threads.length; i++) {
			 reportID.push(threads[i].getAttribute('data-fullname'));
		}
	}
}

function reportItem(index, num) {
  if(num == 3) {var fullname = topicIDs[index];}
  else{var fullname = commentIDs[index];}
  $.post('http://www.reddit.com/api/report', {'id': fullname, 'uh': modHash});
}


function theDownvoter() {
	if (parsedPage[3] == 'user'){
		var items = $('#siteTable').find('.arrow.down');
		    Array.prototype.forEach.call(items, function(el, i){
		      setTimeout(function(){
		        el.click();
		      },100 + ( i * 400 ));
		    });
		    return false;
	}
	else {
		if (commentPage.length == 0) {
			var items = $('#siteTable').find('.arrow.down');
		    Array.prototype.forEach.call(items, function(el, i){
		      setTimeout(function(){
		        el.click();
		      },100 + ( i * 400 ));
		    });
		    return false;
	 	}
	 	else {
			var items = $('.commentarea').find('.arrow.down');
		    Array.prototype.forEach.call(items, function(el, i){
		      setTimeout(function(){
		        el.click();
		      },100 + ( i * 400 ));
		    });
		    return false;
	 	}
	}
}

function theUpvoter() {
	if (parsedPage[3] == 'user'){
		var items = $('#siteTable').find('.arrow.up');
		    Array.prototype.forEach.call(items, function(el, i){
		      setTimeout(function(){
		        el.click();
		      },100 + ( i * 400 ));
		    });
		    return false;
	}
	else {
		if (commentPage.length == 0) {
			var items = $('#siteTable').find('.arrow.up');
		    Array.prototype.forEach.call(items, function(el, i){
		      setTimeout(function(){
		        el.click();
		      },100 + ( i * 400 ));
		    });
		    return false;
	 	}
	 	else {
			var items = $('.commentarea').find('.arrow.up');
		    Array.prototype.forEach.call(items, function(el, i){
		      setTimeout(function(){
		        el.click();
		      },100 + ( i * 400 ));
		    });
		    return false;
	 	}
	}
}

function clickYourUpvotes() {
	var clickandupvote = [];
	$('#siteTable').find('.flat-list.buttons').find('.first').find('a.comments, a.bylink').each(function(index,value){
		clickandupvote.push($(this).attr('href'));	
	});
	for (i=0;i < clickandupvote.length;i++){
		window.open(clickandupvote[i]);
	}
	var items = $('#siteTable').find('.arrow.up');
		    Array.prototype.forEach.call(items, function(el, i){
		      setTimeout(function(){
		        el.click();
		      },100 + ( i * 400 ));
		    });
		    return false;
}

function clickYourDownvotes() {
	var clickandupvote = [];
	$('#siteTable').find('.flat-list.buttons').find('.first').find('a.comments, a.bylink').each(function(index,value){
		clickandupvote.push($(this).attr('href'));	
	});
	for (i=0;i < clickandupvote.length;i++){
		window.open(clickandupvote[i]);
	}
	var items = $('#siteTable').find('.arrow.down');
		    Array.prototype.forEach.call(items, function(el, i){
		      setTimeout(function(){
		        el.click();
		      },100 + ( i * 400 ));
		    });
		    return false;
}
		
function reportToSpam(){
	var username = $(document).find('.pagename.selected').text();
	window.open('http://www.reddit.com/submit?url=' + currentPage);
}

generateToolbar(), getHash(),buildReportArray(), doStuff()