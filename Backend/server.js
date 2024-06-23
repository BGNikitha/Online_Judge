const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors') ; 
const DBConnection = require('./config/db');

const app = express();

// Connect Database
DBConnection();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true // Allow credentials (cookies)
};


// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

const homeRoutes = require("./routes/home") ;
const userRoutes = require("./routes/user") ;
const adminRoutes = require("./routes/admin") ;
const compilerRoutes = require("./routes/compiler") ;



app.use( "/" , homeRoutes ) ;
app.use( "/user"  , userRoutes ) ;
app.use( "/admin" , adminRoutes ) ;
app.use( "/compiler" , compilerRoutes ) ;




const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
