const expressLimit = require("express-rate-limit");


//limit connexion
const maxAttempts = expressLimit({
// miliseconds delay
windowMs: 5*60*1000, 
//connexion time auth
max: 5,
message: 
"Veuillez retentez dans quelques minutes"
});

module.exports = maxAttempts;