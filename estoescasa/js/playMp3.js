
// Change these two lines to modify your PLAY and STOP buttons.
var mp3PlayButton = "https://www.recordsdelmundo.es/estoescasa/images/play2.gif";
var mp3StopButton = "https://www.recordsdelmundo.es/estoescasa/images/stop2.gif";

if(typeof(TagTooga) == 'undefined')
	TagTooga = {}

TagTooga.Mp3 =
{
	playimg: null,
	player: null,

	go: function()
		{
		var all = document.getElementsByTagName('a');
		for (var i = 0, o; o = all[i]; i++)
			{
			if(o.href.match(/\.mp3$/i))
				{
				var img = document.createElement('img');
				img.src = mp3PlayButton;
				img.title = 'listen';
				//img.height = img.width = 12;
				img.style.marginRight = '0.5em';
				img.style.cursor = 'pointer';
				img.onclick = TagTooga.Mp3.makeToggle(img, o.href);
				o.parentNode.insertBefore(img, o);
				}
			}
		},

	toggle: function(img, url)
		{
		if (TagTooga.Mp3.playimg == img)
			TagTooga.Mp3.destroy();
		else
		{
		if (TagTooga.Mp3.playimg)
			TagTooga.Mp3.destroy();
		var a = img.nextSibling;

		img.src = mp3StopButton;
		TagTooga.Mp3.playimg = img;
		TagTooga.Mp3.player = document.createElement('span');
		TagTooga.Mp3.player.innerHTML = 'playing...<object style="vertical-align:bottom;margin-right:0.2em" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' +
'codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"' +
			'width="1" height="1" id="player" align="middle">' +
			'<param name="wmode" value="transparent" />' +
			'<param name="allowScriptAccess" value="sameDomain" />' +
			'<param name="flashVars" value="theLink='+url+'" />' +
			'<param name="movie" value="https://www.recordsdelmundo.es/estoescasa/swf/playMp3.swf" /><param name="quality" value="high" />' +
			'<embed style="vertical-align:bottom;margin-right:0.2em" src="https://www.recordsdelmundo.es/estoescasa/swf/playMp3.swf" flashVars="theLink='+url+'"'+
			'quality="high" wmode="transparent" width="1" height="1" name="player"' +
			'align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"' +
			' pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
		img.parentNode.insertBefore(TagTooga.Mp3.player, img.nextSibling);
		}
		},

	destroy: function()
	{
		TagTooga.Mp3.playimg.src = mp3PlayButton;
		TagTooga.Mp3.playimg = null;
		TagTooga.Mp3.player.removeChild(TagTooga.Mp3.player.firstChild);
		TagTooga.Mp3.player.removeChild(TagTooga.Mp3.player.firstChild);
		TagTooga.Mp3.player.parentNode.removeChild(TagTooga.Mp3.player);
		TagTooga.Mp3.player = null;
	},

	makeToggle: function(img, url)
	{
		return function()
		{
			TagTooga.Mp3.toggle(img, url);
		}
	}
}

TagTooga.addLoadEvent = function(f)
{
	var old = window.onload;

	if (typeof old != 'function')
		window.onload = f;
	else
		{
		window.onload = function() { old(); f() }
		}
}

TagTooga.addLoadEvent(TagTooga.Mp3.go);
