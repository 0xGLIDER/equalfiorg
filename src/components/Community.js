import React from "react";
import "./../styles/Community.css";

function Community() {
  return (
    <section className="community">
      <h2>Join Our Community</h2>
      <p>Be a part of our growing community on your favorite platforms.</p>
      <div className="community-links">
        <a
          href="https://discord.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="community-link discord"
        >
          <i className="fab fa-discord"></i>
        </a>
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="community-link telegram"
        >
          <i className="fab fa-telegram"></i>
        </a>
        <a
          href="https://reddit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="community-link reddit"
        >
          <i className="fab fa-reddit"></i>
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="community-link instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </section>
  );
}

export default Community;
