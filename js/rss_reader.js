var rssReaderFeeds = [];

function showList() {
	"use strict";
	$("#feedslisting").empty();
	var i, newfeed;
	for (i = 0; i < rssReaderFeeds.length; i+=1) {
		if (rssReaderFeeds[i].included === true) {
            newfeed = '<p class="feedlist"><button type="button" id="delete_feed' + i + '" class="deletebtn">X</button><button type="button" id="edit_feed' + i + '" class="editbtn">E</button><span id="feedid' + i + '" class="feedid" hidden>' + rssReaderFeeds[i].id + '</span><input type="checkbox" id="include_feed' + i + '" name="include_feed' + i + '" class="includeck" checked /><span id="feedname' + i + '">' + rssReaderFeeds[i].name + '</span><span id="feedsite' + i + '" hidden>' + rssReaderFeeds[i].site + '</span></p>';
	    } else {
            newfeed = '<p class="feedlist"><button type="button" id="delete_feed' + i + '" class="deletebtn">X</button><button type="button" id="edit_feed' + i + '" class="editbtn">E</button><span id="feedid' + i + '" class="feedid" hidden>' + rssReaderFeeds[i].id + '</span><input type="checkbox" id="include_feed' + i + '" name="include_feed' + i + '" class="includeck" /><span id="feedname' + i + '">' + rssReaderFeeds[i].name + '</span><span id="feedsite' + i + '" hidden>' + rssReaderFeeds[i].site + '</span></p>';
	    }
	    $("#feedslisting").append(newfeed);
    }
}

function showFeed() {
	"use strict";
	var i, thissite, thisname;
	jQuery(function($) {
		for (i = 0; i < rssReaderFeeds.length; i+=1) {
			if (rssReaderFeeds[i].included === true) {
		        thisname = rssReaderFeeds[i].name;
		        thissite = rssReaderFeeds[i].site;
			    $("#rss-feeds").rss(thissite,{limit: null, ssl: false, entryTemplate: '<li><a href="{url}" target="_blank">{title}</a><br/><span class="rss_small">' + thisname + '<br/>{date}</span><br/><button type="button" class="morebtn">&plus;</button><span class="rssshort">{shortBody}</span><br/><span class="rssall">{bodyPlain}</span></li><br/>', dateFormat: 'MMMM D, YYYY, h:mm:ss A'})
		    }
	    }
	});
}


$("#instructions_btn").click(function () {
	"use strict";
	$("#instructions_div").show();
});

$("#closeinstr_btn").click(function () {
	"use strict";
    $("#instructions_div").hide();
});

$("#showform_btn").click(function () {
	"use strict";
	$("#feeds_form_div").show();
    $("#reset_btn").click();
});



// FEEDS FORM ******************************************************************************/*

function resetInput() {
	"use strict";
    $("#feeds_form_div").hide();
    $("#feeds_form").reset();
}

$("#submit_feed").click(function (e) {
	"use strict";
	e.preventDefault();
    var i = 0, found = false, thisfeed = {};
	var thisid = $("#feed_id").val().trim();
	var thisname = $("#feed_name").val().trim();
	var thissite = $("#feed_site").val().trim();
	var thisinclude = $("#feed_include").is(":checked");
	if ((thisname !== "") && (thissite !== "")) {
		if (thisid === "") {
			if (rssReaderFeeds.length > 0) {
			    thisid = rssReaderFeeds[rssReaderFeeds.length - 1].id + 1;
			} else {
                thisid = "1";
			}
			thisfeed = {"id": thisid, "name": thisname, "site": thissite, "included": true};
	        rssReaderFeeds.push(thisfeed);
		} else {			
			while ((found === false) && (i < rssReaderFeeds.length)) {
				if (rssReaderFeeds[i].id === thisid) {
	                found = true;
	         		thisfeed = {"id": thisid, "name": thisname, "site": thissite, "included": thisinclude};
	                rssReaderFeeds[i] = thisfeed;
				} else {
				    i+=1;
			    }
			}
			if (found === false) {
				alert("Error, feed not found!");
				return;
			}
	    }
	    showList();
		$("#feeds_form_div").hide();
		$("#update_feeds").click();
	} else {
		alert("Feed name and url must be filled in!");
	}
});

$("#closeform_btn").click(function () {
	"use strict";
    resetInput();
});



// FEEDS LISTING FORM ******************************************************************************

$("#clear_feeds").click(function () {
	"use strict";
	var i, feeds = document.querySelectorAll(".includeck");
	for (i = 0; i < feeds.length; i+=1) {
		document.getElementById("include_feed" + i).checked = false;
	}
});

$("#all_feeds").click(function () {
	"use strict";
	var i, feeds = document.querySelectorAll(".includeck");
	for (i = 0; i < feeds.length; i+=1) {
		document.getElementById("include_feed" + i).checked = true;
	}
});

$("body").on("click", ".editbtn", function (e) {
	"use strict";
	e.preventDefault();
	var f = this.id.slice(9);
    $("#feed_id").val(document.getElementById("feedid" + f).innerHTML);
    $("#feed_name").val(document.getElementById("feedname" + f).innerHTML);
    $("#feed_site").val(document.getElementById("feedsite" + f).innerHTML);
    if (document.getElementById("include_feed" + f).checked === true) {
        $("#feed_include").prop("checked", true);
    } else {
        $("#feed_include").prop("checked", false);
    }
	$("#feeds_form_div").show();
});

$("body").on("click", ".deletebtn", function (e) {
	"use strict";
	e.preventDefault();
	var checkstr = window.confirm("Sure you want to delete this feed?");
    if (checkstr === false) {
        return false;
    }
	var f = this.id.slice(11);
	var thisid = document.getElementById("feedid" + f).innerHTML;
	var i = 0, found = false;
	while ((found === false) && (i < rssReaderFeeds.length)) {
		if (rssReaderFeeds[i].id === thisid) {
            found = true;           
		} else {
		    i+=1;
	    }
	}
	if (found === true) {
		rssReaderFeeds.splice(i, 1);
    } else {
		alert("Error, feed not found!");
		return;
	}
    showList();
	$("#update_feeds").click();
});



$("#update_feeds").click(function (e) {
    "use strict";
    e.preventDefault();
	$("#rss-feeds").empty();
	var f, feeds = document.querySelectorAll(".includeck");
	for (f = 0; f < feeds.length; f+=1) {
        rssReaderFeeds[f].included = document.getElementById("include_feed" + f).checked;
	}
    showFeed();
});

$("body").on("click", ".morebtn", function () {
    "use strict";
    if ($(this).closest("li").find(".rssshort").css("display") === "block") {
        $(this).closest("li").find(".rssshort").hide();
        $(this).closest("li").find(".rssall").show();
    } else {
        $(this).closest("li").find(".rssshort").show();
        $(this).closest("li").find(".rssall").hide();  	
    }  
});


$("#top_feeds, #top_feeds2").click(function () {
    "use strict";
    window.scrollTo(0, 0);
});

function checkFloat() {
	"use strict";
    if ($("#main").css("float") === "none") {
        $("#top_feeds2").show();
    } else {
        $("#top_feeds2").hide();    	
    }	
}

var theserssfeeds;

function saveFeeds() {
    "use strict";
    theserssfeeds = JSON.stringify(rssReaderFeeds);
    localStorage.setItem("theserssfeeds", theserssfeeds);
}

$(document).ready(function () {
	"use strict";
	theserssfeeds = localStorage.getItem("theserssfeeds");
	if (theserssfeeds !== null) {
        rssReaderFeeds = JSON.parse(theserssfeeds);
    } else {
    	rssReaderFeeds = [];
    }
	checkFloat();
    $("#update_feeds").on("click", function (event) {  
        event.preventDefault();
        var el = $(this);
        el.prop("disabled", true);
        setTimeout(function (){
        	el.prop("disabled", false);
        }, 3000);
    });
    showList();
	showFeed();
});

$(window).resize(function () {
	"use strict";
	checkFloat();
});
