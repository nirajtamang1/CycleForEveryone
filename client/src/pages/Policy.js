import React from "react";
import policy from "../images/privacy.jpg";
import Layout from "../components/Layout/Layout";

function Policy() {
  return (
    <Layout title="Privacy Policy - Cycle Booking System">
      <div className="container mt-2 d-flex justify-content-center align-item-center">
        <div className="row">
          <h3>Cycle For Everyone - Terms and Conditions</h3>
          <p>
            These Terms and Conditions ("Terms") govern your use of Cycle For
            Everyone's services, including but not limited to our cycle rental
            system, website, mobile applications, and any associated services
            (collectively, "Services"). By accessing or using our Services, you
            agree to be bound by these Terms. If you do not agree to these
            Terms, please do not use our Services
          </p>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using our Services, you agree to abide by these Terms and any
            additional terms and policies referenced herein or available within
            the Services.
          </p>
          <h2>2. Registration and Accounts</h2>
          <p>
            You may be required to create an account and provide certain
            information in order to access certain features of our Services. You
            agree to provide accurate, current, and complete information during
            the registration process and to update such information as necessary
            to keep it accurate, current, and complete.
          </p>
          <h2>3. User Conduct</h2>
          <p>
            You agree not to engage in any conduct that is unlawful, offensive,
            threatening, abusive, defamatory, harassing, or otherwise
            objectionable while using our Services.
          </p>
          <h2>4. Payment and Charges</h2>
          <p>
            Rental charges and any applicable fees will be clearly displayed
            before you confirm your rental. By completing a rental transaction,
            you authorize Cycle For Everyone to charge your chosen payment
            method for the total amount due.
          </p>
          <h2>5. Contact Information</h2>
          <p>If you have any questions or concerns about these Terms, please contact us at cyclesforeveryone@gmail.com</p>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
