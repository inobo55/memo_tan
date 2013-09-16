

var ReqeustController = function(url,selectionText){
	this.url = url;
	this.selectionText = selectionText;
	this.imi = null;
	this.sendRequest_();
};
ReqeustController.prototype = {

	url:null,
	sendRequest_:function(){
		var req = new XMLHttpRequest();
		req.open("GET",this.url,true);
		req.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		req.send();
		
		var _selectionText = this.selectionText;
		req.onload = function(){
			console.log(req.responseText);

			if(this.responseText.indexOf('<ItemID>') != -1){

				//if SearchDicItemResultのXMLが返ってきたとき

				//参考URL: http://memopad.bitter.jp/w3c/dom/dom_httprequest.html
				x = req.responseXML.getElementsByTagName('ItemID');
				itemID = x[0].childNodes[0].nodeValue;


				var get_url = "http://public.dejizo.jp/NetDicV09.asmx/GetDicItemLite?Dic=EJdict&Item="
				 + itemID + "&Loc=&Prof=XHTML";

				window.PC = new ReqeustController(get_url,_selectionText);

			}else if(this.responseText.indexOf('<GetDicItemResult') != -1){

				// if GetDicItemResultのXMLが返ってきたとき

				var imi = req.responseXML.getElementsByTagName('div')[2].childNodes[0].nodeValue;

				var local_url = 'http://localhost:8888/chrome/memo_tan/API/memo_tan.php?tango=' + encodeURIComponent(_selectionText) + '&imi=' + imi;

				console.log(_selectionText);

				window.PC = new ReqeustController(local_url,_selectionText);
			}else if(this.responseText.indexOf('SearchDicItemResult') != -1){

				/* if TotalHitCountが０だった場合とは、
					1.[able],[ables],[s],[ed],[ied],[ing],[or]が語尾に付いていて、判定できなかった。
					2.もともと、そんな語はない。
					3.専門用語か、俗語。
				*/
				var s = _selectionText;
				if(!( s = checkText(s) ))
					return;

				var search_url = "http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=" + encodeURIComponent(s)+"&Scope=HEADWORD&Match=STARTWITH&Merge=AND&Prof=XHTML&PageSize=1&PageIndex=0";

				window.PC = new ReqeustController(search_url,_selectionText+'@');

			}
		}
	}
};

function myIndexOf(text,str){
	var str_len = str.length*(-1);
	if(text.indexOf(str,str_len) != -1)
		return str.length;
	return false;
}
function checkText(text){
	var array = ['ables','able','ied','ing','ed','or','s'];
	for(var str in array){
		if(str_length = myIndexOf(text,str)){
			return substr(text,(-1)*str_length,str_length);
		}
	}
	return false;
}


chrome.contextMenus.create({
	"title":"【 %s 】をメモタンに渡す",
	"type":"normal",
	"contexts":["selection"],
	"onclick":function(info){
		
		var search_url = "http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=" + encodeURIComponent(info.selectionText) +"&Scope=HEADWORD&Match=STARTWITH&Merge=AND&Prof=XHTML&PageSize=1&PageIndex=0";

		window.PC = new ReqeustController(search_url,info.selectionText);


	}
});

chrome.contextMenus.create({
	"title":"メモタンにアクセスする",
	"type":"normal",
	"contexts":["all"],
	"onclick":function(info){
		var url = "http://localhost:8888/chrome/memo_tan/VIEW/index.php";
		chrome.tabs.create({
			url: url
		});
	}
});
