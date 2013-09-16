


var ReqeustController = function(url,selectionText){
	this.url = url;
	this.selectionText = selectionText;
	this.imi = null;
	this.sendRequest_(url);
};
ReqeustController.prototype = {

	url:null,
	sendRequest_:function(url){
		var req = new XMLHttpRequest();
		req.open("GET",url,true);
		req.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		req.send();

		req.onload = function(){
			console.log(req.responseText);

			if(this.responseText.indexOf('<ItemID>') != -1){

/*

パーサーなんとかせねば。

*/		

				itemID = req.responseXML.getElementsByTagName('ItemID').item(0).nodeValue;

				var get_url = "http://public.dejizo.jp/NetDicV09.asmx/GetDicItemLite?Dic=EJdict&Item=" + itemID + "&Loc=&Prof=XHTML";

				window.PC = new ReqeustController(get_url,this.selectionText);

			}else if(this.responseText.indexOf('<GetDicItemResult') != -1){

				var body = req.responseXML.getElementsByTagName('Body').item(0);
				var div = body.getElementsByTagName('div').nodeValue;
				var imi = div.getElementsByTagName('div').nodeValue;

				var local_url = 'http://localhost:8888/chrome/memo_tan/API/memo_tan.php?tango=' + encodeURIComponent(this.selectionText) + '&imi=' + imi;

				window.PC = new ReqeustController(local_url,this.selectionText);
			}
		}
	}
};

chrome.contextMenus.create({
	"title":"【 %s 】をメモタンに渡す",
	"type":"normal",
	"contexts":["selection"],
	"onclick":function(info){
		
		var search_url = "http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite?Dic=EJdict&Word=" + encodeURIComponent(info.selectionText) +"&Scope=HEADWORD&Match=STARTWITH&Merge=AND&Prof=XHTML&PageSize=1&PageIndex=0";

		window.PC = new ReqeustController(search_url,info.selectionText);

		chrome.tabs.create({
			url:search_url
		});
	}
});
