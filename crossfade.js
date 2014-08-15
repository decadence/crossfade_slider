function crossfade_slider(selector, options)
{	

	// корневой контейнер
	var parent = jQuery(selector);
	
	// контейнер слайдов
	var ul = parent.find("ul");
	
	// список слайдов
	var collection =  ul.find("li");
	
	var current_index = 0;
	
	var length = collection.length;
	
	// активна ли сейчас анимация
	var running = false;
	
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
	
	// обработчики кнопок
	jQuery(options.btnNext).click(function(e)
	{
		slide(true);
		e.preventDefault();
		
	});
	
	jQuery(options.btnPrev).click(function(e)
	{
		slide(false);
		e.preventDefault();
	});
	
	// кроме первого
	collection.eq(current_index).css("zIndex", 10).show();
	
	
	// настраиваем размер родителя
	if (options.adjustParent)
	{
		parent.height(collection.eq(current_index).height());
	}
	
	// переключение слайда
	function slide(forward)
	{
		// ничего не делаем, если анимация уже активна
		if (running)
		{
			return;
		}
		
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
		
		
		running = true;
		
		// отображаеи поверх новый и плавно увеличиваем его прозрачность
		collection.eq(new_index).css("zIndex", 10).fadeIn(options.fadeTime, function()
		{
			collection.eq(hide_index).hide(); // прячем в конце старый по запомненному индексу, так как до callback'a он меняется на новый. Скрытие нужно для работы fadeIn
			
			// устанавливаем родителю нужную высоту
			if (options.adjustParent)
			{
				var new_height = collection.eq(new_index).height();
				if (options.animateParent)
				{
					parent.animate({"height": new_height}, options.animateParentDuration);
				}
				
				else
				{
					parent.height(new_height);
				}
			}
			
			running = false;
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
		auto: false, // включить ли автоматический переход слайдов
		timeout: 2000,	// время между автоматическим переходом слайдов
		fadeTime: 500, // время перехода от слайда к слайду
		btnPrev: "#btnPrev", // селекторы для кнопок Далее / Назад
		btnNext: "#btnNext",
		adjustParent: true, // изменять ли высоту родителя под новый слайд
		animateParent: true, // анимировать ли высоту родителя
		animateParentDuration: 400 // длительность анимации высоты родителя
	});
});




