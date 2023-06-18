// ██╗  ██╗██████╗  █████╗ ██████╗  ██████╗ 
// ██║ ██╔╝╚════██╗██╔══██╗╚════██╗██╔════╝ 
// █████╔╝  █████╔╝███████║ █████╔╝███████╗ 
// ██╔═██╗  ╚═══██╗██╔══██║██╔═══╝ ██╔═══██╗
// ██║  ██╗██████╔╝██║  ██║███████╗╚██████╔╝
// ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╦╔═╦═╗╦╔═╗╔═╗╦╦═╗╔╦╗╔═╗╔╗╔╔═╗╔═╗╦═╗
// v1.1.0                                    ╠╩╗╠╦╝║╚═╗╠═╣║╠╦╝ ║║╠═╣║║║║  ║╣ ╠╦╝
//                                           ╩ ╩╩╚═╩╚═╝╩ ╩╩╩╚══╩╝╩ ╩╝╚╝╚═╝╚═╝╩╚═ 

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

/***** ROUTING IMPORTS *****/

const portfolioRoutes = require('./routes/portfolio-routes');
const kaRoutes = require('./routes/ka-routes');

/***** CONFIGURATIONS *****/

const PORT = 11001;

/***** APPLICATION SETUP *****/

const app = express();

// Expose public directory
app.use(express.static(path.join(__dirname, 'public')));

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Not yet sure if I need this
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/***** ROUTING *****/

app.use('/', portfolioRoutes);
app.use('/ka', kaRoutes);

app.use((req, res) => { 
    res.status(404).render('404', { title: '404'} );
});

/***** LAUNCH APPLICATION *****/

app.listen(PORT, error => {
    if (error) {
        // TODO: Log the error instead.
        throw error;
    }
    console.log(`Listening on port ${PORT}.`)
})