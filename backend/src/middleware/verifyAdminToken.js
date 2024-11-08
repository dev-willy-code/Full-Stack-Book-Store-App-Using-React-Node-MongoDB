const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyAdminToken = (req, res, next) => {
    //parts[0] sería 'Bearer'
    //parts[1] sería 'abc123'

    const token = req.headers['authorization']?.split(' ')[1]; //para poder obtener headers authorization, se debe incluir ciuando hacemos fecth
    if (!token) {
        return res.status(401).json({ message: "Access Denied.Token not provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }
        //console.log(user.role);

        if (user.role !== "admin") {
            return res.status(403).json({ message: 'No eres admin' });
        }
        req.user = user; // con esto luego por ejemplo podria comprobar roles
        /* id: '672409fe828c8ce7014d46d2',
            username: 'admin',
                role: 'admin',
                    iat: 1730476488,
                        exp: 1730476548 */
        console.log("userverify: ", user);
        next(); //ir al siguinete middleware
    })
}

module.exports = verifyAdminToken;