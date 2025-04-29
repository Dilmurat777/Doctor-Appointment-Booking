import { EmailTemplate } from '../../../emails/index.jsx';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const response = await req.json();
    const { UserName, Email, Time, Date, Note, DoctorName } = response.data;

    const data = await resend.emails.send({
      from: 'Appointment Booking <onboarding@resend.dev>', // Используем безопасный адрес
      to: ['mrdilmurat777@gmail.com', response.data.Email],
      subject: 'Appointment Booking Confirmation',
      react: EmailTemplate({ 
        userFirstname: UserName,
        appointmentDate: Date,
        appointmentTime: Time,
        doctorName: DoctorName,
        userNote: Note,
      }),
    });

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 });
  }
}

