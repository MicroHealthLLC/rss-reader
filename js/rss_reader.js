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


function findFeeds(datefrom, dateto, searchinfo) {
	"use strict";
    var thesefeeds = document.getElementsByTagName("li");
    if (thesefeeds.length > 0) {
	    var j, title, thesetitles = document.querySelectorAll(".title");
	    var feeddate, from_date, to_date, thesedates = document.querySelectorAll(".date");
	    var rssall, theserssall = document.querySelectorAll(".rssall");
	    var datefilter, wordfilter, includefeed;
	    if ((datefrom !== null) || (dateto !== thisdate)) {
	        datefilter = true;
	    } else {
		    datefilter = false;     	
	    }
	    if (searchinfo !== null) {
	        wordfilter = true;
	    } else {
	        wordfilter = false;    	
	    }
	    for (j = 0; j < thesefeeds.length; j+=1) {
            includefeed = true;
            if (datefilter === true) {
                feeddate = new Date(thesedates[j].innerHTML);
                feeddate.setHours(0,0,0,0);
                from_date = new Date(datefrom);
                to_date = new Date(dateto);
                if ((feeddate < from_date) || (feeddate > to_date)) {
                    includefeed = false;                	
                }
            }
            if (includefeed === true) {
            	if (wordfilter === true) {
		    		title = thesetitles[j].innerHTML.toLowerCase();
		    		rssall = theserssall[j].innerHTML.toLowerCase();
			        if ((title.indexOf(searchinfo) > -1) || (rssall.indexOf(searchinfo) > -1)) {
			            $(thesefeeds[j]).addClass("lishow");
			            $(thesefeeds[j]).removeClass("lihide");
				    } else {
			            $(thesefeeds[j]).addClass("lihide");
			            $(thesefeeds[j]).removeClass("lishow");
			        }
			    } else {
		            $(thesefeeds[j]).addClass("lishow");
		            $(thesefeeds[j]).removeClass("lihide");		    	
			    }		    
		    } else {
	            $(thesefeeds[j]).addClass("lihide");
	            $(thesefeeds[j]).removeClass("lishow");
		    }
	    }
	}
}

function showFeed(datefrom, dateto, searchinfo) {
	"use strict";
	var i, thissite, thisname;
	jQuery(function($) {
		for (i = 0; i < rssReaderFeeds.length; i+=1) {
			if (rssReaderFeeds[i].included === true) {
		        thisname = rssReaderFeeds[i].name;
		        thissite = rssReaderFeeds[i].site;
			    $("#rss-feeds").rss(thissite,{limit: null, ssl: false, entryTemplate: '<li class="lishow"><a href="{url}" target="_blank"><span class="title">{title}</span></a><br/><span class="rss_small">' + thisname + '<br/><span class="date">{date}</span></span><br/><button type="button" class="morebtn">&plus;</button><span class="rssshort">{shortBody}</span><br/><span class="rssall">{bodyPlain}</span><br /></li>', dateFormat: 'MMMM D, YYYY, h:mm:ss A'})
		    }
	    }
	});
	findFeeds(datefrom, dateto, searchinfo);		
}


$("#searchbtn").click(function () {
	"use strict";
	var searchinput = $("#searchinput").val().toLowerCase().trim();
	var searchfromdate = $("#searchfromdate").val();
	var searchtodate = $("#searchtodate").val();
	if (searchinput === "") {
	    findFeeds(searchfromdate, searchtodate, null);
    } else {
	    findFeeds(searchfromdate, searchtodate, searchinput);
    }
});


$("#searchfromdate").change(function () {
	"use strict";
	var searchfromdate = $("#searchfromdate").val();
    var testdate = new Date(searchfromdate);
    var okdate = (testdate instanceof Date && !isNaN(testdate.valueOf()));
	if (okdate === false) {
    	$( "#searchfromdate" ).datepicker("setDate", null);
	}
});

$("#searchtodate").change(function () {
	"use strict";
	var searchtodate = $("#searchtodate").val();
    var testdate = new Date(searchtodate);
    var okdate = (testdate instanceof Date && !isNaN(testdate.valueOf()));
	if ((searchtodate === null) || (okdate === false)) {
    	$( "#searchtodate" ).datepicker("setDate", thisdate);
	}
});

$("#resetsearch").click(function () {
	"use strict";
    $( "#searchfromdate" ).datepicker("setDate", null);
    $( "#searchtodate" ).datepicker("setDate", thisdate);
	$("#searchinput").val("");
    var j, thesefeeds = document.getElementsByTagName("li");
    if (thesefeeds.length > 0) {
	    for (j = 0; j < thesefeeds.length; j+=1) {
            $(thesefeeds[j]).addClass("lishow");
            $(thesefeeds[j]).removeClass("lihide");
        }
    }
});


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

$("#update_feeds").click(function (e) {
    "use strict";
    e.preventDefault();
    var el = $(this);
    el.prop("disabled", true);
	$("#rss-feeds").empty();
	var f, feeds = document.querySelectorAll(".includeck");
	for (f = 0; f < feeds.length; f+=1) {
        rssReaderFeeds[f].included = document.getElementById("include_feed" + f).checked;
	}
	var searchfromdate = $("#searchfromdate").val();
	var searchtodate = $("#searchtodate").val();
	var searchinput = $("#searchinput").val().toLowerCase().trim();
	if (searchinput === "") {
        showFeed(searchfromdate, searchtodate, null);
	} else {
	    showFeed(searchfromdate, searchtodate, searchinput);
    }
    setTimeout(function (){
    	el.prop("disabled", false);
    }, 3000);
});


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



function show_list_feeds(obj, from, to) {
    "use strict";
	obj.style.display = "block";
    if (from <= to) {         
       obj.style.marginLeft = from + "px";
       setTimeout(function() {
           show_list_feeds(obj, from + 10, to);
       }, 6)
    } else {
        return;
    }
}

function hide_list_feeds(obj, from, to){
    "use strict";
   if (from <= to) {         
       obj.style.display = "none";
       return;  
   } else {
       obj.style.marginLeft = from + "px";
       setTimeout(function() {
           hide_list_feeds(obj, from - 10, to);
       }, 6)
   }
}

$("#showfeedslistbtn").click(function () {
	"use strict";
	var obj = document.getElementById("controller");
	var obj_width = -Math.abs($(obj).width());
	if (obj.style.display === "block") {
        hide_list_feeds(obj, 0, obj_width);
	} else {
        show_list_feeds(obj, obj_width, 0);
	}
});

$("#hidefeedslistbtn").click(function () {
	"use strict";
	var obj = document.getElementById("controller");
	var obj_width = -Math.abs($(obj).width());
    hide_list_feeds(obj, 0, obj_width);
});



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


$("#top_feeds").click(function () {
    "use strict";
    if ($(window).width() > 769) {
        window.scrollTo(0, 70);
	} else {
        window.scrollTo(0, 120);
	}
});

$("#to_top").click(function () {
    "use strict";
    window.scrollTo(0, 0);
});


var theserssfeeds;

function saveFeeds() {
    "use strict";
    theserssfeeds = JSON.stringify(rssReaderFeeds);
    localStorage.setItem("theserssfeeds", theserssfeeds);
}


$(document).ready(function () {
	"use strict";
    $( "#searchfromdate" ).datepicker("setDate", null);
    $( "#searchtodate" ).datepicker("setDate", thisdate);
	$("#searchinput").val("");
	theserssfeeds = localStorage.getItem("theserssfeeds");
	if (theserssfeeds !== null) {
        rssReaderFeeds = JSON.parse(theserssfeeds);
    } else {
    	rssReaderFeeds = [];
    }
    showList();
	$("#update_feeds").click();
});

