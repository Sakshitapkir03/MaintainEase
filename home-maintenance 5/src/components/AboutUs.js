import React from "react";

const AboutUs = () => {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          color: "#2C3E50",
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        About Us
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "#34495e",
          lineHeight: "1.7",
          marginBottom: "20px",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        Welcome to <strong style={{ color: "#2980b9" }}>MaintainEase</strong>, your trusted partner for all home
        maintenance needs! We are dedicated to providing top-notch home repair and
        maintenance services to ensure your home stays in perfect condition. From plumbing to electrical work,
        painting to carpentry, we cover it all.
      </p>

      <h2
        style={{
          fontSize: "28px",
          color: "#2980b9",
          marginTop: "30px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Our Mission
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: "#34495e",
          lineHeight: "1.7",
          marginBottom: "20px",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        At HomeFix, our mission is to deliver reliable, efficient, and high-quality maintenance solutions for your
        home. We strive to ensure customer satisfaction by maintaining a team of skilled professionals who are
        passionate about what they do.
      </p>

      <h2
        style={{
          fontSize: "28px",
          color: "#2980b9",
          marginTop: "30px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Why Choose Us?
      </h2>
      <ul
        style={{
          listStyleType: "none",
          paddingLeft: "0",
          fontSize: "18px",
        }}
      >
        <li
          style={{
            background: "url('https://img.icons8.com/ios/50/000000/checkmark.png') no-repeat left center",
            backgroundSize: "20px 20px",
            paddingLeft: "35px",
            color: "#34495e",
            marginBottom: "15px",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Experienced and certified technicians
        </li>
        <li
          style={{
            background: "url('https://img.icons8.com/ios/50/000000/checkmark.png') no-repeat left center",
            backgroundSize: "20px 20px",
            paddingLeft: "35px",
            color: "#34495e",
            marginBottom: "15px",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Transparent pricing with no hidden charges
        </li>
        <li
          style={{
            background: "url('https://img.icons8.com/ios/50/000000/checkmark.png') no-repeat left center",
            backgroundSize: "20px 20px",
            paddingLeft: "35px",
            color: "#34495e",
            marginBottom: "15px",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          On-time service guaranteed
        </li>
        <li
          style={{
            background: "url('https://img.icons8.com/ios/50/000000/checkmark.png') no-repeat left center",
            backgroundSize: "20px 20px",
            paddingLeft: "35px",
            color: "#34495e",
            marginBottom: "15px",
            fontFamily: "'Arial', sans-serif",
          }}
        >
          24/7 customer support for all your needs
        </li>
      </ul>

      <h2
        style={{
          fontSize: "28px",
          color: "#2980b9",
          marginTop: "30px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Contact Us
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: "#34495e",
          lineHeight: "1.7",
          marginBottom: "20px",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        Need help or have questions? Reach out to our support team, and we’ll be happy to assist you!
      </p>
    </div>
  );
};

export default AboutUs;