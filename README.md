# TravelAgency
ASP.NET Core, база данных MSSQL, фронтенд React.js

В проекте был использован принцип Code-First (БД генерируется сама на основе C#-классов)
* REST API
* ORM EntityFramework Core

Чтобы зайти с администратора:<br/>
логин: admin@gmail.com<br/>
пароль: _Aa123456

<b>ВОЗМОЖНОСТИ ПРИЛОЖЕНИЯ:</b>
<br/><br/>
Так выглядит главная страница приложения:
<br/>
<img src="https://github.com/klepaski/TravelAgency/raw/main/gitimages/Main.png" width="500">

<b>АДМИНИСТРАТОР:</b>
<br/><br/>
Может создавать, изменять, удалять туры по Беларуси или Зарубежные туры.

Так выглядит панель администратора:
<br/>
<img src="https://github.com/klepaski/TravelAgency/raw/main/gitimages/AdminTours.png" width="500">

Процесс создания тура по Беларуси:
<br/>
<img src="https://github.com/klepaski/TravelAgency/raw/main/gitimages/CreateTour.png" width="500">

Для раздела "Зарубежные туры" всё аналогично.<br/>
Создание отелей тоже практически аналогично.<br/>

Также администратор может одобрить/отклонить комментарий:
<br/>
<img src="https://github.com/klepaski/TravelAgency/raw/main/gitimages/AdminComment.png" width="500">


<b>ПОЛЬЗОВАТЕЛЬ:</b>
<br/><br/>
Может просматривать туры и отели.<br/>

Просмотр туров по Беларуси:
<br/>
<img src="https://github.com/klepaski/TravelAgency/raw/main/gitimages/BelTours.png" width="500"><br/>
Под каждым доступным туром есть кнопка звонка, которая может создать звонок при использовании приложения на телефоне, либо если к ПК подключено мобильное устройство, можно совершить звонок дистанционно на телефон.<br/>

Просмотр зарубежных туров:
<br/>
<img src="https://github.com/klepaski/TravelAgency/raw/main/gitimages/Tours.png" width="500"><br/>
Отличие зарубежных туров от белорусских состоит в том, что при выборе тура мы не совершаем звонок, а перенаправляемся на страницу для выбора отеля, который привязан к данному туру.<br/>

Просмотр отелей:
<br/>
<img src="https://github.com/klepaski/TravelAgency/raw/main/gitimages/Hotels.png" width="500"><br/>
Здесь же можно оставить комментарий под отелем, который позже отмодерирует администратор.<br/>

После выбора тура и отеля в разделе PROFILE появляются заказы пользователя, которые также можно просмотреть или удалить:
<br/>
<img src="https://github.com/klepaski/TravelAgency/raw/main/gitimages/Orders.PNG" width="500">




