import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-muted-foreground">Last updated: February 2026</p>

            <h2>1. Information We Collect</h2>
            <p>
              At Sova Tours and Travels, we collect information you provide directly to us, including:
            </p>
            <ul>
              <li>Name, email address, and phone number when you submit an inquiry</li>
              <li>Travel preferences and dates for trip planning</li>
              <li>Payment information for booking confirmations</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and manage your tour bookings</li>
              <li>Communicate with you about your travel arrangements</li>
              <li>Send promotional offers and newsletters (with your consent)</li>
              <li>Improve our services and customer experience</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information with:
            </p>
            <ul>
              <li>Hotels, airlines, and other travel service providers to fulfill your bookings</li>
              <li>Payment processors for secure transaction handling</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>6. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
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

export default PrivacyPolicy;
