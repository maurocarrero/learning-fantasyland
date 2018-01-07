import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <section>
    <header>
      <h1>FantasyLand Specification</h1>
      <p>Estos apuntes están tomados de <a href="http://www.tomharding.me/2017/03/03/fantas-eel-and-specification">fantas-eel-and-specification</a> de Tom Harding.</p></header>
    <article>
      <h3>Daggy: tipo suma</h3>
      <p>Librería pequeña para crear <strong>tipos suma</strong> para programas funcionales.</p>
      <h5>Exporta 2 funciones:</h5>
      <ul>
        <li>
          <h4>.tagged</h4>
          <ul>
            <li>Una utilidad muy pequeña para crear constructores que construyan objetos con propiedades con nombre.
            </li>
            <li>Crea un nuevo tipo con <strong>un solo constructor</strong> (función).</li>
            <li>Al crear el tipo pasamos como argumento las propiedades que deben tener los objetos creados con este
              nuevo constructor.
            </li>
            <li>Una forma de verlo es como una manera de guardar los modelos con datos más rígidos.</li>
            <pre>
              <code>
              //+ Coord :: (Int, Int, Int) -> Coord<br/>
              const Coord = daggy.tagged('Coord', ['x', 'y', 'z'])<br/>
              <br/>
              //+ Line :: (Coord, Coord) -> Line<br/>
              const Line = daggy.tagged('Line', ['from', 'to'])<br/>
            </code>
            </pre>
          </ul>
        </li>
        <li>
          <h4>.taggedSum</h4>
          <ul>
            <li>Crea un nuevo tipo con múltiples constructores.</li>
            <li>Las múltiples formas de nuestro tipo se denominan <strong>constructores de tipo</strong>.</li>
            <li>
              <h5>Ejemplo Bool:</h5> Bool es un tipo que únicamente puede tener 2 valores: True o False. Para
                representar un tipo de estas características debemos crearlo con múltiples constructores, 2 en este caso.
                Ninguno de los 2 constructores recibe parámetros y en la práctica no son ejecutables ya que se devolverían
                a si mismos.
                <pre>
                <code>
{`
const Bool = daggy.taggedSum('Bool', {
  True: [], False: []
})
`}
            </code>
            </pre>
            </li>
            <li>
              <h5>Ejemplo Shape:</h5> En este caso tenemos 2 constructores y estos deben recibir un
              conjunto distinto de valores. El cuadrado (Square) necesita las coordenadas de sus 2 vértices opuestos mientras
              que el círculo (Circle) necesita las coordenadas de su centro y el valor de su radio.
              <pre>
                <code>
              {`
const Shape = daggy.taggedSum('Shape', {
  // Square :: (Coord, Coord) -> Shape
  Square: ['topleft', 'bottomright'],

  // Circle :: (Coord, Number) -> Shape
  Circle: ['centre', 'radius']
})
              `}
                </code>
              </pre>
              Podemos <strong>agregar métodos al prototipo de Shape</strong> de la misma manera que antes:
              <pre>
                <code>
                  {`
Shape.prototype.translate =
  function (x, y, z) {
    return this.cata({
      Square: (topleft, bottomright) =>
        Shape.Square(
          topleft.translate(x, y, z),
          bottomright.translate(x, y, z)
        ),

      Circle: (centre, radius) =>
        Shape.Circle(
          centre.translate(x, y, z),
          radius
        )
    })
  }

Shape.Square(Coord(2, 2, 0), Coord(3, 3, 0))
    .translate(3, 3, 3)
// Square(Coord(5, 5, 3), Coord(6, 6, 3))

Shape.Circle(Coord(1, 2, 3), 8)
    .translate(6, 5, 4)
// Circle(Coord(7, 7, 7), 8)
                  `}
                </code>
              </pre>
            </li>
            El método <strong>translate</strong> en este caso va a tener diferentes implementaciones dependiendo del tipo
            de Shape.
            <br/>
            <strong>this.cata</strong> (concepto de catamorfismo de teoría de categorías) nos permite hacer esto.
          </ul>
        </li>
      </ul>
    </article>
    <article>
      <h3>Hindley-Miner: Firmas de tipo</h3>
      <p>Una manera de describir la firma de una función especificando los tipos de sus argumentos y valor de
        retorno.</p>
    </article>
  </section>
);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
