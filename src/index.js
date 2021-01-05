const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
// Inicializaciones
const app = express();
require('./database');

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');
// Middlewares
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'ohana',
    resave: true,
    saveUninitialized: true
}));


// Variables Globales

// Rutas
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
})