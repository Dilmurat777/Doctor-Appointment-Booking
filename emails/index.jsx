import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';
export const EmailTemplate = ({
  userFirstname = 'Test User',
  appointmentDate,
  appointmentTime,
  userNote,
  doctorName,
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Appointment Confirmation</Preview>

      <Container style={container}>
      <Img src={`${baseUrl}/logo.svg`} alt="Logo" style={logo} width="200" height="50" />

        <Text style={paragraph}>Hi {userFirstname},</Text>

        <Text style={paragraph}>Your appointment has been confirmed!</Text>

        <Text style={paragraph}>
          <strong>Date:</strong> {appointmentDate}
          <br />
          <strong>Time:</strong> {appointmentTime}
          <br />
          <strong>Doctor:</strong> {doctorName}
          <br />
          <strong>Note:</strong> {userNote || 'No notes'}
        </Text>

        <Section style={btnContainer}>
          <Button style={button} href={baseUrl}>
            View Appointment
          </Button>
        </Section>

        <Text style={paragraph}>
          See you soon!
          <br />
          Doctor Appointment Team
        </Text>

        <Hr style={hr} />
        <Text style={footer}>Your Clinic Address Here</Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

// Styles
const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' };
const container = { margin: '0 auto', padding: '20px' };
const logo = { margin: '0 auto', display: 'block' };
const paragraph = { fontSize: '16px', lineHeight: '24px' };
const btnContainer = { textAlign: 'center', marginTop: '20px' };
const button = {
  backgroundColor: '#0070f3',
  color: '#fff',
  padding: '12px 24px',
  textDecoration: 'none',
  borderRadius: '5px',
};
const hr = { borderColor: '#eeeeee', margin: '20px 0' };
const footer = { fontSize: '12px', color: '#888888', textAlign: 'center' };
