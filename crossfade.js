function crossfade_slider(selector, options)
{	
	var parent = jQuery(selector);
	var ul = parent.find("ul");
	var collection =  ul.find("li");
	
	var current_index = 0;
	
	var length = collection.length;
	
	
	ul.css("position", "relative");
	
	// ставим все в абсолютную позицию и прячем
	collection.css({
		"position": "absolute",
		"zIndex": 0,
		"left": 0,
		"top": 0,
		"display": "none"
	});
	
	parent.css("overflow", "hidden");
	
	// кроме первого
	collection.eq(current_index).css("zIndex", 10).show();
	
	// настраиваем родителя
	parent.height(collection.eq(current_index).height());
	
	// переключение слайда
	function slide(forward)
	{
	
		var step = (forward == true) ? 1 : -1;
		
		var new_index = current_index + step;
			
		// сбрасываем индекс в начало
		if(new_index == length)
		{
			new_index = 0;
		}
		
		// или в конец, если мы уже в начале
		if (new_index == -1)
		{
			new_index = length - 1;
		}

		// индекс, который нужно спрятать
		var hide_index = current_index;
		
		// отводим на задний план текущий элемент, но не скрываем - он пока единственный видимый
		collection.eq(hide_index).css("zIndex", 0);
		
		// отображаеи поверх новый и плавно увеличиваем его прозрачность
		collection.eq(new_index).css("zIndex", 10).fadeIn(options.fadeTime, function()
		{
			collection.eq(hide_index).hide(); // прячем в конце старый по запомненному индексу, так как до callback'a он меняется на новый. Скрытие нужно для работы fadeIn
			
			// устанавливаем родителю нужную высоту
			parent.height(collection.eq(new_index).height());
			
		});
		
		current_index = new_index;
		console.log("Current slide: " + current_index);
	}
	
	// запускаем перещёлкивание по таймеру
	if (options.auto)
	{
		setInterval(function()
		{
			slide(true);
		}, options.timeout);
	}
}


jQuery(function()
{
	crossfade_slider("#slider", {
		auto: true, // включить ли автоматический переход слайдов
		timeout: 2000,	// время между автоматическим переходом слайдов
		fadeTime: 500, // время перехода от слайда к слайду
	});
});




