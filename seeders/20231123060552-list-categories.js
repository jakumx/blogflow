'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      id: uuidv4(),
      name: 'Viajes y Aventura',
      imageUrl: 'https://source.unsplash.com/un-hombre-y-una-mujer-caminando-en-el-desierto-3DPaL6XDcZE',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: 'Gastronomía del Mundo',
      imageUrl: 'https://source.unsplash.com/tiro-macro-de-lote-de-vegetales-4_jhDO54BYg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: 'Estilo de Vida Saludable',
      imageUrl: 'https://source.unsplash.com/tres-cajas-de-agua-en-caja-estan-rodeadas-de-fruta-en-rodajas-mGgfHoStPlg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: 'Desarrollo Personal y Bienestar',
      imageUrl: 'https://source.unsplash.com/cinco-mujer-de-pie-en-la-orilla-del-mar-GaprWyIw66o',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: 'Tecnología y Innovación',
      imageUrl: 'https://source.unsplash.com/imac-plateado-cerca-del-iphone-en-una-mesa-de-madera-marron-EhTcC9sYXsw',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: 'Creatividad y Arte',
      imageUrl: 'https://source.unsplash.com/tres-pinceles-plateados-sobre-textiles-blancos-D5nh6mCW52c',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: 'Naturaleza y Ecología',
      imageUrl: 'https://source.unsplash.com/campo-de-hierba-verde-durante-la-puesta-de-sol-_RBcxo9AU-U',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      name: 'Cine y Entretenimiento',
      imageUrl: 'https://source.unsplash.com/persona-viendo-pelicula-AtPWnYNDJnM',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
