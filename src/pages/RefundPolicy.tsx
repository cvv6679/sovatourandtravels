import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Refund & Cancellation Policy
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-muted-foreground">Last updated: February 2026</p>

            <h2>1. Cancellation by Customer</h2>
            <p>
              Cancellation charges will be calculated based on the time of cancellation before the
              departure date:
            </p>
            <ul>
              <li><strong>30+ days before departure:</strong> 10% of total tour cost</li>
              <li><strong>15-29 days before departure:</strong> 25% of total tour cost</li>
              <li><strong>7-14 days before departure:</strong> 50% of total tour cost</li>
              <li><strong>Less than 7 days:</strong> No refund</li>
            </ul>

            <h2>2. Cancellation by Sova Tours</h2>
            <p>
              In the rare event that we need to cancel a tour due to unforeseen circumstances:
            </p>
            <ul>
              <li>Full refund will be provided if cancellation is from our side</li>
              <li>Alternative dates or tours may be offered</li>
              <li>No compensation for external factors like natural disasters or government restrictions</li>
            </ul>

            <h2>3. Non-Refundable Items</h2>
            <p>The following are non-refundable:</p>
            <ul>
              <li>Visa fees and processing charges</li>
              <li>Flight tickets once confirmed (subject to airline policy)</li>
              <li>Travel insurance premiums</li>
              <li>Any bookings marked as non-refundable</li>
            </ul>

            <h2>4. Refund Process</h2>
            <p>
              Refunds will be processed within 15-20 working days after approval. The amount will be
              credited to the original payment method.
            </p>

            <h2>5. Modification of Booking</h2>
            <p>
              Changes to booking dates or destinations may incur additional charges based on
              availability and price differences. Please contact us at least 15 days before departure
              for modifications.
            </p>

            <h2>6. No Show Policy</h2>
            <p>
              If a traveler fails to show up for the tour without prior cancellation, no refund will
              be provided.
            </p>

            <h2>7. Contact for Refunds</h2>
            <p>
              For refund requests or queries, please contact us:
            </p>
            <ul>
              <li>Email: sovainternetcafe@gmail.com</li>
              <li>Phone: +91 9474025173</li>
              <li>WhatsApp: +91 9474025173</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
