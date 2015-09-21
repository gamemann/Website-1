var contentDefault = 'home';
var useAJAX = true;
var oldContent = contentDefault;
var content = [];

$(window).load(function()
{
	$('.content').each(function (Index)
	{
		if ($(this).attr('id') != contentDefault + '-content')
		{
			$(this).css('left', 5000 + $(this).width());
		}
		else
		{
			$(this).css('left', 0);
		}
	});
	
	// Move the mobile NavBar.
	$('#navlistm').css('left', -5000 - $(this).width());
	
	// Add the default tab to selected.
	$('#' + contentDefault).addClass('selected');
	
	// Get default data...
	fillData(contentDefault);
	
	// Give every content a specific number.
	var i = 0;
	$('.navitem').each(function()
	{
		content[i] = $(this).attr('id');
		i++;
	});
});

function fillData(sContent)
{
	$.get('content/' + sContent + '.php', function (Data)
	{
		$('#' + sContent + '-content').html('<span class="glyphicon glyphicon-menu-left contentArrowLeft"></span>' + Data + '<span class="glyphicon glyphicon-menu-right contentArrowRight"></span>');
		$('.contentArrowRight').click(moveContentRight);
		$('.contentArrowLeft').click(moveContentLeft);
	});
}

function moveContentClick(e)
{	
	moveContent($(this).attr('id'));
}

function moveContentLeft(e)
{
	// Get the current number.
	var curContentID = 0;
	
	for (var i = 0; i < content.length; i++)
	{
		if (content[i] == oldContent)
		{
			curContentID = i;
		}
	}
	
	if (curContentID == 0)
	{
		curContentID = content.length;
	}
	
	// Move let's move back.
	moveContent(content[curContentID - 1]);
}

function moveContentRight(e)
{	
	// Get the current number.
	var curContentID = 0;
	
	for (var i = 0; i < content.length; i++)
	{
		if (content[i] == oldContent)
		{
			curContentID = i;
		}
	}
	
	if (curContentID == (content.length - 1))
	{
		curContentID = -1;
	}
	
	// Move let's move front.
	moveContent(content[curContentID + 1]);
}

function moveContent(aContent, sPosition)
{
	// Refresh if AJAX is enabled...
	if (useAJAX)
	{
		fillData(aContent);
	}
	
	// We move the previous content out of the way.
	if (oldContent == aContent)
	{
		return;
	}
	
	// Let's get the IDs.
	var curID, futID;
	for (var i = 0; i < content.length; i++)
	{
		if (content[i] == aContent)
		{
			futID = i;
		}
		
		if (content[i] == oldContent)
		{
			curID = i;
		}
	}
	
	$('#' + oldContent).removeClass('selected');
	
	// Left and Right.
	var newLeft = 0;
	var oldLeft = 0;
	
	if (futID < curID)
	{	
		oldLeft = 3000 + $(this).width();
		newLeft = -3000 - $(this).width();
		
		if (futID == 0 && curID == (content.length - 1))
		{
			oldLeft = -3000 - $(this).width();
			newLeft = 3000 + $(this).width();
		}
	}
	else
	{	
		oldLeft = -3000 - $(this).width();
		newLeft = 3000 + $(this).width();
		
		if (curID == 0 && futID == (content.length - 1))
		{
			oldLeft = 3000 + $(this).width();
			newLeft = -3000 - $(this).width();
		}
	}
	
	$('#' + oldContent + '-content').animate({
		left: oldLeft
	}, 700, function()
	{
		// Complete (move it back to the original spot...).
		//$(this).css('left', -5000 - $(this).width());
	});
		
		$('#' + aContent + '-content').css('left', newLeft);
	
	// Now move the new one in.
	$('#' + aContent + '-content').animate({
		left: 0
	}, 700);
	
	oldContent = aContent;
	$('#' + oldContent).addClass('selected');
	
	// Let's get rid of the mobile NavBar as well
	pushNavBar();
}

// Content moving...
$('.navitem').click(moveContentClick);
$('.navitemm').click(moveContentClick);

$('.content').on('swipeleft', moveContentLeft);
$('.content').on('swiperight', moveContentRight);

// NavBar Moving
$('#pullNav').click(pullNavBar);
$('#pushNav').click(pushNavBar);

function pushNavBar()
{
	$('#navlistm').animate({
		left: -5000 - $(this).width(),
		top: 0
	}, 700);
	
	$('#pullNav').animate({
		left: 0
	}, 700);
}

function pullNavBar()
{
	$('#navlistm').animate({
		left: 0,
		top: $(window).scrollTop()
	}, 700);
	
	$(this).animate({
		left: -500 - $(this).width()
	}, 700);
}