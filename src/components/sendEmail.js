import * as emailjs from "emailjs-com";
export const sendEmail = ({ name, email, verifyLink }) => {
  const data = {
    name: name,
    email: email,
    verifyLink: verifyLink,
  };

  emailjs.init("2hUV1GLHX6hixJRJS");

  emailjs
    .send("service_l0f690e", "template_zzahj9c", data, "2hUV1GLHX6hixJRJS")

    .then(
      (result) => {
        alert("Email sent");
      },
      (error) => {
        alert("Error sending email");
      }
    );
};
