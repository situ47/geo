ymaps.ready(init);

function init() {
    const map = new ymaps.Map("map", {
        center: [59.9398, 31.3146], // Центр карты на Ленинградской области
        zoom: 8
    });

    // Находим минимальное и максимальное население
    const populations = cities.map(city => city.population);
    const minPopulation = Math.min(...populations);
    const maxPopulation = Math.max(...populations);

    // Функция для вычисления цвета в зависимости от населения
    function getColor(population) {
        const ratio = (population - minPopulation) / (maxPopulation - minPopulation);
        const red = Math.floor(255 * ratio);
        const green = Math.floor(255 * (1 - ratio));
        return rgb(${red}, ${green}, 0);
    }

    // Добавляем метки на карту
    cities.forEach(city => {
        const placemark = new ymaps.Placemark(city.coords, {
            hintContent: ${city.name}<br>Население: ${city.population},
            balloonContent: ${city.name}<br>Население: ${city.population}
        }, {
            preset: 'islands#circleIcon',
            iconColor: getColor(city.population)
        });
        map.geoObjects.add(placemark);
    });
}