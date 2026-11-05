import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventConfigProvider } from './context/EventConfigContext';
import Envelope from './components/Envelope';
import Hero from './components/Hero';
import InvitationCard from './components/InvitationCard';
import Message from './components/Message';
import EventDetails from './components/EventDetails';
import Agenda from './components/Agenda';
import AdditionalInfo from './components/AdditionalInfo';
import RSVPForm from './components/RSVPForm';
import ThankYou from './components/ThankYou';
import Footer from './components/Footer';
import BottomDock from './components/BottomDock';
import AdminPage from './components/AdminPage';
import useScrollReveal from './hooks/useScrollReveal';

function InvitationPage() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const handleEnvelopeOpen = useCallback(() => {
    setEnvelopeOpened(true);
  }, []);

  useScrollReveal();

  return (
    <>
      <Envelope onOpen={handleEnvelopeOpen} />
      <div className="c-page">
        <Hero />
        <main id="noi-dung" className="c-main">
          <InvitationCard />
          <Message />
          <EventDetails />
          <Agenda />
          <AdditionalInfo />
          <RSVPForm />
          <ThankYou />
        </main>
        <Footer />
      </div>
      <BottomDock />
    </>
  );
}

function App() {
  return (
    <EventConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InvitationPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </EventConfigProvider>
  );
}

export default App;
