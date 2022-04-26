import '../css/componentes.css';
// 1 import webpacklogo from '../assets/img/webpack-logo.png';

export const saludar = ( nombre  = 'Sin Nombre') => {

    console.log('Creando etiqueta h1');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${nombre}`;
    document.body.append( h1 );
 
    // Img 
// 1    const img = document.createElement('img');
// 1    img.src = webpacklogo;
// 1    document.body.append( img );
}

// 1 Comente estas lineas para probar de cargar la imagen directamente desde el html ver clase 93