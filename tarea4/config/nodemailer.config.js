const nodemailer = require("nodemailer");

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user: email,
        pass: pass
    },
});



module.exports.sendValidationEmail = (user) => {

    transporter.sendMail({
        from: `"Arquitectura de servidores" <${email}> `,
        to: user.email,
        subject: "Welcome to Arq. Ser.",
        html: `
        <h1> Welcome to Arq. de Serv. </h1>
        <a href = "http://localhost:8000/api/users/${user.id}/validate"> Activate your account </a>

        `   
    })
    .then(()=> {
        console.log("email sent");
    })
    .catch((err)=> console.error("error sending email: ", err))

};

