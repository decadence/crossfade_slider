/*
	Имя: Crossfade Slider
	Автор: Исадов Виктор
*/

function crossfade_slider(selector, user_options)
{
	// настройки по умолчанию
	var options = {
		auto: false, // включить ли автоматический переход слайдов
		timeout: 2000,	// время между автоматическим переходом слайдов
		fadeTime: 500, // время перехода от слайда к слайду
		cycle: false, // продолжать ли по кругу при достижении крайнего элемента
		btnPrev: "#btnPrev", // селекторы для кнопок Далее / Назад
		btnNext: "#btnNext",
		adjustParent: true, // изменять ли высоту родителя под новый слайд
		animateParent: true, // анимировать ли высоту родителя
		animateParentDuration: 400, // длительность анимации высоты родителя
		beforeStart: function(current_index) // колбек на начало перехода слайда
		{},
		afterEnd: function(current_index) // колбек на окончание перехода слайда
		{},
		hover: true // TODO останавливать ли переход при hover
	}
	
	// объединение стандартных настроек и пользовательских
	options = jQuery.extend(options, user_options);
	
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
		"display": "none",
		"width": "100%"
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

	function go_to_index(index)
	{
		if (index < 0 || index >= length)
		{
			console.log('Неверный индекс');
			return false;
		}
	
		slide(true, index);
	}
	
	// переключение слайда
	function slide(forward, index)
	{
	
		// ничего не делаем, если анимация уже активна
		if (running)
		{
			return;
		}
		
		options.beforeStart(current_index);
		
		
		// если индекс не передан, значит двигаемся вперёд / назад
		if (typeof index === "undefined")
		{
			var step = (forward == true) ? 1 : -1;
		
			var new_index = current_index + step;
				
			// сбрасываем индекс в начало
			if(new_index == length)
			{
				// ничего не делаем, если опция по кругу отключена
				if (!options.cycle)
				{
					return;
				}
				
				new_index = 0;
			}
			
			// или в конец, если мы уже в начале
			if (new_index == -1)
			{
				if (!options.cycle)
				{
					return;
				}
				
				new_index = length - 1;
			}
			
		}
		
		// иначе наш целевой индекс берём из параметра
		else
		{
			new_index = index;
		}

		// если переход на текущий слайд, ничего не делаем
        if(current_index == new_index){
            return;
        }
	
		
		// индекс, который нужно спрятать
		var hide_index = current_index;
		
		// отводим на задний план текущий элемент, но не скрываем - он пока единственный видимый
		collection.eq(hide_index).css("zIndex", 0);
		running = true;

		// плавно убираем старый слайд, чтобы не было перескакиваний в случае с текстом
        collection.eq(hide_index).fadeOut(options.fadeTime);
		
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
			options.afterEnd(current_index);
			ul.height(new_height);
		});
		
		current_index = new_index;
	}
	
	// запускаем перещёлкивание по таймеру
	if (options.auto)
	{
		setInterval(function()
		{
			slide(true);
		}, options.timeout);
	}
	
	
	// объект, который возвращается. Содержит публичные функции, которые можно использовать для управления слайдером
	var returner = {
		// переход к определённому слайду
		go_to: go_to_index,
		// переход вперёд / назад
		go_next: function()
		{
			slide(true);
		},
		go_prev: function()
		{
			slide(false);
		},
		// получение индекса текущего слайда
		get_current_index: function()
		{
			return current_index;
		}
	};
	
	return returner;
}






