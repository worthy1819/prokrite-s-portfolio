const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-btn');

const serviceId = ''
const templateId = ""

form.addEventListener("submit", (e) => {
   e.preventDefault();
   const params = {
      name: e.target["name"].value,
      email: e.target["email"].value,
      subject: e.target["subject"].value,
      message: e.target["message"].value.trim()
   }
   console.log(params);
   sendEmail(params, e)
})

async function sendEmail(params, e) {
   if (!params.name || !params.email || !params.subject || !params.message) {
      alert("Form could not be empty!!")
      return
   }

   submitBtn.disabled = true
   try {
      const response = await emailjs.send(serviceId, templateId, params)
      console.log('SUCCESS!', response.status, response.text);
      alert('SUCCESS!', response.status, response.text)
      e.target.reset()
      submitBtn.disabled = false
   } catch (error) {
      console.log('FAILED...', error);
      alert('FAILED...', error)
   }
}
