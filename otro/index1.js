const readline = require('readline');
const chalk = require('chalk');
const { Client } = require('pg');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Configuración de la base de datos PostgreSQL
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'work-tools',
  password: 'root',
  port: 5432, // Puerto por defecto de PostgreSQL
};

const client = new Client(dbConfig);

// Función para conectar a la base de datos
async function connectToDB() {
  try {
    await client.connect();
    console.log(green('Conexión a la base de datos establecida.'));
  } catch (error) {
    console.error(red('Error al conectar a la base de datos:', error));
    process.exit(1);
  }
}

// Función para leer datos desde la consola
function promptUser() {
  rl.question(blue('Ingrese un dato: '), async (data) => {
    // Insertar el dato en la base de datos
    try {
      await client.query('INSERT INTO datos (valor) VALUES ($1)', [data]);
      console.log(green('Dato insertado en la base de datos.'));
    } catch (error) {
      console.error(red('Error al insertar el dato:', error));
    }

    // Preguntar si desea ingresar otro dato
    rl.question(blue('¿Desea ingresar otro dato? (s/n): '), (answer) => {
      if (answer.toLowerCase() === 's') {
        promptUser();
      } else {
        rl.close();
        client.end();
        console.log(yellow('Programa finalizado.'));
      }
    });
  });
}

// Iniciar la conexión a la base de datos y solicitar datos al usuario
connectToDB().then(() => {
  promptUser();
});
