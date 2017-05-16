# jQuery Crossfade Slider

## Общее описание
Простой плагин слайдера с crossfade-эффектом. 

Требует jQuery, но пока сделан не как плагин, а функция, принимающая селектор корневого div.

## Схема работы
+ Располагает элементы с position: absolute в одном контейнере друг под другом
+ Переход происходит через смену display, opacity и z-index. 
+ Нужный элемент ставится поверх всех с 0 прозрачностью, потом плавно она увеличивается. 

## Использование

	var slider = crossfade_slider("#slider", {
	    auto: true
	});


## Возвращаемый объект
Содержит функции, которые можно использовать для управления слайдером:

+ go_to  
    Переход к определённому слайду     
+ go\_next / go\_prev  
    Переход вперёд / назад
+ get\_current\_index  
	Получение индекса текущего слайда

	
## Настройки
+ auto [false]  
	Включить ли автоматический переход слайдов  
+ timeout [2000]  
	Время между автоматическим переходом слайдов
+ fadeTime [500]  
	Время перехода от слайда к слайду
+ cycle [false]  
	Продолжать ли по кругу при достижении крайнего элемента
+ btnPrev / btnNext ["#btnPrev" / "#btnNext"]  
	Селекторы для кнопок Далее / Назад
+ adjustParent [false]  
	Изменять ли высоту родителя под новый слайд
+ animateParent [true]  
	Анимировать ли высоту родителя
+ animateParentDuration [400]  
	Длительность анимации высоты родителя
+ beforeStart [пустая функция]  
	Колбек на начало перехода слайда (в параметрах индекс текущего слайда)
+ afterEnd [пустая функция]  
	Колбек на окончание перехода слайда (в параметрах индекс текущего слайда)
+ hover [true]  
	TODO останавливать ли переход при hover


## Заметки
+ 

## TODO
+ селектор для кнопок навигации


