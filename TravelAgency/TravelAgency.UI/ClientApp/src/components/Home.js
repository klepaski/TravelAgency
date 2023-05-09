import React, { Component } from 'react';
import './styles.css'

export class Home extends Component {
  static displayName = Home.name;
  

  render () {
    return (
      <div>  
        <div style={{marginRight: -15, marginLeft: -15}}>  
        <section id="main-page">
                <div className="wrapper">
                   <br></br> <br></br> <h2>Организуйте своё <br></br>
            <strong>Индивидуальное путешествие</strong></h2> 
        </div>
    </section>

    <section id="steps">
        <div className="container">
            <ul>
                <li id="step-1">
                    <h4>Планирование</h4>
                    <p>Можете положиться на нас. Мы соответствуем вашим ожиданиям.</p>
                </li>
                <li id="step-2">
                    <h4>Организованность</h4>
                    <p>Bоспользуйтесь опытом наших специалистов, 
                      они будут сопровождать Вас в реализации Вашей поездки.</p>
                </li>
                <li id="step-3">
                    <h4>Путешествие</h4>
                    <p>Мы позаботимся о том, чтобы обеспечить вашу безопасность и полное спокойствие на протяжении всей поездки.</p>
                </li>
                <div className="clear"></div>
            </ul>
        </div>
    </section>

    <section id="contact">
        <div className="container">
            <h3>Выбирайте нас</h3>
            <p>В туристическом агентстве мы знаем, что путешествие - это человеческое приключение, 
              а также важное финансовое обязательство для вас. Вот почему мы стремимся учитывать все ваши ожидания, 
              чтобы помочь вам в подготовке вашего индивидуального пребывания, путешествия или поездки.
            </p>

        </div>
    </section>
    <footer>
        <div className="wrapper">
            <h1>Travel Agency<span className="orange">.</span></h1>
            <div className="copyright">Copyright © 2023.<br></br>Чистякова Юлия<br></br>
            </div>
        </div>
    </footer> 
    </div>  

      </div>
    );
  }
}
