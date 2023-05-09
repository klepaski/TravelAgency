using System.Net;
using System.Net.Mail;

namespace TravelAgency.BLL.Services
{


    public class EmailService
    {
        public string SendAsyncEmail(string Email, string Subject, string Message)
        {
            try
            {
                // Credentials
                var credentials = new NetworkCredential("maxim.tickhonovich@gmail.com", "MikseR1004");
                // Mail message
                var mail = new MailMessage()
                {
                    From = new MailAddress("maxim.tickhonovich@gmail.com"),
                    Subject = Subject,
                    Body = Message
                };
                mail.IsBodyHtml = true;
                mail.To.Add(new MailAddress(Email));
                // Smtp client
                var client = new SmtpClient()
                {
                    Port = 587,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Host = "smtp.gmail.com",
                    EnableSsl = true,
                    Credentials = credentials
                };
                client.Send(mail);
                return "Email Sent Successfully!";
            }
            catch (System.Exception e)
            {
                return e.Message;
            }

        }
    }
}
    