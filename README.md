# TravelAgency
ASP.NET Core, база данных MSSQL, фронтенд React.js

В проекте был использован принцип Code-First (БД генерируется сама на основе C#-классов)
* REST API
* ORM EntityFramework Core

Чтобы зайти с администратора:
логин: admin@gmail.com
пароль: _Aa123456

ВОЗМОЖНОСТИ ПРИЛОЖЕНИЯ:

Так выглядит главная страница приложения:
![Main Page](https://github.com/klepaski/TravelAgency/raw/master/gitimages/Main.png)


АДМИНИСТРАТОР:
Может создавать, изменять, удалять туры по Беларуси или Зарубежные туры.

Так выглядит панель администратора:
![Admin Tours](https://github.com/klepaski/TravelAgency/raw/master/gitimages/AdminTours.png)

Процесс создания тура по Беларуси:
![Create Tour](https://github.com/klepaski/TravelAgency/raw/master/gitimages/CreateTour.png)

Для раздела "Зарубежные туры" всё аналогично.
Создание отелей тоже практически аналогично.

Также администратор может одобрить/отклонить комментарий:
![Admin comment](https://github.com/klepaski/TravelAgency/raw/master/gitimages/AdminComment.png)


ПОЛЬЗОВАТЕЛЬ:
Может просматривать туры и отели.

Просмотр туров по Беларуси:
![BelTours](https://github.com/klepaski/TravelAgency/raw/master/gitimages/BelTours.png)
Под каждым доступным туром есть кнопка звонка, которая может создать звонок при использовании приложения на телефоне, либо если к ПК подключено мобильное устройство, можно совершить звонок дистанционно на телефон.

Просмотр зарубежных туров:
![Tours](https://github.com/klepaski/TravelAgency/raw/master/gitimages/Tours.png)
Отличие зарубежных туров от белорусских состоит в том, что при выборе тура мы не совершаем звонок, а перенаправляемся на страницу для выбора отеля, который привязан к данному туру.

Просмотр отелей:
![Hotels](https://github.com/klepaski/TravelAgency/raw/master/gitimages/Hotels.png)
Здесь же можно оставить комментарий под отелем, который позже отмодерирует администратор.

После выбора тура и отеля в разделе PROFILE появляются заказы пользователя, которые также можно просмотреть или удалить:
![Orders](https://github.com/klepaski/TravelAgency/raw/master/gitimages/Orders.png)




