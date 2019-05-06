import { Component } from '@angular/core';
import { Country } from '../../model';

@Component({
    selector: 'wal-main',
    templateUrl: './wal-main.component.html',
    styleUrls: ['./wal-main.component.scss']
})
export class WalMainComponent {
    public countries: Country[] = new Array();

    constructor() {
        this.countries = [
            {
                name: 'Азербайджан',
                cities: ['Баку']
            },
            {
                name: 'Армения',
                cities: ['Ереван']
            },
            {
                name: 'Беларусь',
                cities: ['Бобруйск', 'Борисов', 'Брест', 'Витебск', 'Гомель', 'Гродно', 'Минск', 'Могилёв', 'Молодечно', 'Солигорск']
            },
            {
                name: 'Грузия',
                cities: ['Тбилиси']
            },
            {
                name: 'Казахстан',
                cities: ['Астана', 'Алма-Ата', 'Актау', 'Актобе', 'Атырау', 'Караганда', 'Кокшетау', 'Костанай', 'Кызылорда',
                    'Павлодар', 'Петропавловск', 'Семей', 'Талдыкорган', 'Тараз', 'Туркестан', 'Уральск', 'Усть-Каменогорск', 'Шымкет']
            },
            {
                name: 'Киргизия',
                cities: ['Бишкек', 'Ош']
            },
            {
                name: 'Латвия',
                cities: ['Рига']
            },
            {
                name: 'Литва',
                cities: ['Вильнюс']
            },
            {
                name: 'Молдавия',
                cities: ['Кишенев']
            },
            {
                name: 'Россия',
                cities: ['Астрахань', 'Барнаул', 'Брянск', 'Волгоград', 'Воронеж', 'Екатеринбург', 'Ижевск', 'Иркутск', 'Казань', 'Кемерово',
                    'Киров', 'Краснодар', 'Красноярск', 'Курган', 'Липецк', 'Махачкала', 'Москва', 'Набережные Челны', 'Нижний Новгород',
                    'Новокузнецк', 'Новосибирск', 'Омск', 'Орел', 'Оренбург', 'Пенза', 'Пермь', 'Ростов-на-Дону', 'Рязань', 'Самара',
                    'Санкт-Петербург', 'Сочи', 'Тольятти', 'Томск', 'Тюмень', 'Ульяновск', 'Уфа', 'Хабаровск', 'Челябинск', 'Ярославль']
            },
            {
                name: 'Таджикистан',
                cities: ['Душанбе', 'Худжанд']
            },
            {
                name: 'Узбекистан',
                cities: ['Андижан', 'Бухара', 'Наманган', 'Нукус', 'Самарканд', 'Ташкент', 'Фергана']
            },
            {
                name: 'Украина',
                cities: ['Днепр', 'Житомир', 'Запорожье', 'Киев', 'Кривой Рог', 'Львов', 'Одесса', 'Полтава', 'Харьков']
            },

        ];
    }
}
