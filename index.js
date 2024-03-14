const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-btn');

const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID

form.addEventListener("submit", async (e) => {
   e.preventDefault();
   const params = {
      name: e.target["name"].value,
      email: e.target["email"].value,
      subject: e.target["subject"].value,
      message: e.target["message"].value.trim()
   };

   console.log(params);
   submitBtn.disabled = true;
   showLoadingState();

   try {
      const response = await sendEmail(serviceId, templateId, params);
      console.log('SUCCESS!', response.status, response.text);
      showToast("Message sent successfully");
      e.target.reset();
   } catch (error) {
      console.log('FAILED...', error);
      showToast("Failed to send message");
   } finally {
      submitBtn.disabled = false;
   }
});

async function sendEmail(serviceId, templateId, params) {
   if (!params.name || !params.email || !params.subject || !params.message) {
      throw new Error("Form could not be empty!!");
   }

   try {
      const response = await emailjs.send(serviceId, templateId, params);
      return response;
   } catch (error) {
      throw error;
   }
}

function showLoadingState() {
   setTimeout(() => {
      submitBtn.innerText = "Still loading...";
   }, 5000);
}

function showToast(message) {
   const toast = document.createElement("div");
   toast.className = "bg-green-500 text-white px-4 py-2 fixed bottom-4 right-4 rounded-md";
   toast.innerText = message;
   document.body.appendChild(toast);

   setTimeout(() => {
      toast.remove();
   }, 3000);
}
