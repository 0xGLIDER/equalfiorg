import React from "react";
import "./../styles/Team.css";

function Team() {
  return (
    <section className="team">
      <h2>Meet the Team</h2>
      <div className="team-members">
        <div className="team-member">
          <img src="./assets/team-member1.jpg" alt="Team Member" />
          <h3>John Doe</h3>
          <p>CEO & Founder</p>
        </div>
        <div className="team-member">
          <img src="./assets/team-member2.jpg" alt="Team Member" />
          <h3>Jane Smith</h3>
          <p>CTO</p>
        </div>
      </div>
    </section>
  );
}

export default Team;
