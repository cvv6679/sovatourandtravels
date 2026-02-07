import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Terms & Conditions
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-muted-foreground">Last updated: February 2026</p>

            <h2>1. Booking & Payment</h2>
            <ul>
              <li>A minimum 30% advance payment is required to confirm the booking</li>
              <li>Balance payment must be made 7 days before the tour departure</li>
              <li>Prices are subject to change without prior notice</li>
              <li>All payments must be made in Indian Rupees (INR)</li>
            </ul>

            <h2>2. Travel Documents</h2>
            <ul>
              <li>Valid ID proof is mandatory for all travelers</li>
              <li>For Hajj/Umrah packages, valid passport with 6+ months validity is required</li>
              <li>Sova Tours is not responsible for denied entry due to improper documents</li>
            </ul>

            <h2>3. Tour Inclusions & Exclusions</h2>
            <p>
              Each tour package clearly mentions what is included and excluded. Please read the package
              details carefully before booking. Any services not mentioned in inclusions are not covered.
            </p>

            <h2>4. Accommodation</h2>
            <ul>
              <li>Hotels are subject to availability and may change to similar category</li>
              <li>Room allocation is at the hotel's discretion</li>
              <li>Early check-in and late check-out are subject to availability and extra charges</li>
            </ul>

            <h2>5. Transportation</h2>
            <ul>
              <li>Vehicle type and model may vary based on availability</li>
              <li>Seating arrangement is on first-come-first-serve basis</li>
              <li>AC will not be operational in hilly areas due to road conditions</li>
            </ul>

            <h2>6. Itinerary Changes</h2>
            <p>
              Sova Tours reserves the right to modify the itinerary due to:
            </p>
            <ul>
              <li>Weather conditions</li>
              <li>Road closures or natural calamities</li>
              <li>Political situations or strikes</li>
              <li>Hotel/flight unavailability</li>
            </ul>

            <h2>7. Liability</h2>
            <p>
              Sova Tours and Travels shall not be responsible for:
            </p>
            <ul>
              <li>Loss or damage to personal belongings</li>
              <li>Injuries during the tour</li>
              <li>Delays caused by third-party services</li>
              <li>Force majeure events</li>
            </ul>

            <h2>8. Health & Safety</h2>
            <ul>
              <li>Travelers must disclose any medical conditions before booking</li>
              <li>Travel insurance is recommended for all tours</li>
              <li>Travelers must follow safety guidelines during the tour</li>
            </ul>

            <h2>9. Behavior</h2>
            <p>
              Travelers are expected to behave responsibly and respect local customs and cultures.
              Sova Tours reserves the right to terminate services without refund for misconduct.
            </p>

            <h2>10. Disputes</h2>
            <p>
              Any disputes arising from bookings shall be subject to the jurisdiction of courts in
              Rampurhat, West Bengal, India.
            </p>

            <h2>11. Contact</h2>
            <p>For any queries regarding these terms:</p>
            <ul>
              <li>Email: sovainternetcafe@gmail.com</li>
              <li>Phone: +91 9474025173</li>
              <li>Address: MNK Road, Bharsala More, Rampurhat, West Bengal 731224</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsConditions;
