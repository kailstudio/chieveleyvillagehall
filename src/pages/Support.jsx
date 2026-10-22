import { CLUB_500, COMMITTEE_CONTACT } from '../data/content.js';
import { href } from '../router.js';
import { PageHeader, JumpLinks, Photo, Arrow } from '../components/Bits.jsx';

export default function Support() {
  return (
    <>
      <PageHeader photo="hero-support" eyebrow="Support us" title="Help" accent="your hall."
        intro="The hall is a registered charity, run by volunteers. Make a donation, join the 500 Club or lend a hand at an event. It doesn't matter how long you've lived in the village.">
        <div className="hero-actions">
          <a className="btn btn-solid-light" href={href('support/donate')}>Make a donation <Arrow /></a>
          <a className="btn btn-outline-light" href={href('support/500-club')}>Join the 500 Club</a>
        </div>
      </PageHeader>
      <JumpLinks page="support" links={[['donate', 'Donate'], ['500-club', '500 Club'], ['winners', 'Winners'], ['volunteer', 'Volunteer']]} />

      {/* ---------- Donate ---------- */}
      <section id="donate" className="section">
        <div className="wrap">
          <div className="donate-lead">
            <div>
              <p className="eyebrow">Donate</p>
              <h2 className="display sm">A donation <span className="thin">of any size</span></h2>
              <p className="lede">We've secured several grants for hall improvements, and donations of any size help us go further. Every pound goes to running and improving the hall and recreation ground.</p>
            </div>
            <aside className="donate-contact">
              <p>To give, or to ask about any of these ways to donate, contact {COMMITTEE_CONTACT.name}, our {COMMITTEE_CONTACT.role}.</p>
              <a className="btn btn-dark" href={`mailto:${COMMITTEE_CONTACT.email}?subject=Donation%20to%20Chieveley%20Village%20Hall`}>Email {COMMITTEE_CONTACT.email}</a>
            </aside>
          </div>
          <div className="three-col">
            <article className="info-card">
              <h3 className="h3">One-off or monthly</h3>
              <p>Give a single donation whenever suits you, or set up a regular monthly donation to support the hall all year round.</p>
            </article>
            <article className="info-card">
              <h3 className="h3">A gift in your will</h3>
              <p>Leaving a gift to the hall in your will helps keep it at the heart of village life for generations to come. Any amount, large or small, makes a lasting difference.</p>
            </article>
            <article className="info-card">
              <h3 className="h3">Other ways to help</h3>
              <p>Join the <a href={href('support/500-club')}>500 Club</a> from {CLUB_500.ticket} a year, or buy a ticket for our bonfire and fireworks night, a major fundraiser for the hall.</p>
              <a className="text-link" href={href('whats-on/upcoming')}>Upcoming events <Arrow /></a>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- 500 Club: join, prizes, winners ---------- */}
      <section id="500-club" className="band band-mint">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">500 Club</p>
              <h2 className="display">Join the <span className="thin">500 Club</span></h2>
            </div>
            <p className="muted">Help fund the Village Hall and Recreation Ground. Each member gets a numbered ticket in our monthly prize draws.</p>
          </div>
          <div className="prize-row">
            <div className="prize prize-main"><span className="prize-amt">{CLUB_500.ticket}</span><span>per ticket, per year</span><small>{CLUB_500.halfYear} for half-year (joining 1 January – 30 June)</small></div>
            {CLUB_500.prizes.map((p) => (
              <div key={p.label} className="prize"><span className="prize-amt">{p.amount}</span><span>{p.label}</span>{p.note && <small>{p.note}</small>}</div>
            ))}
          </div>

          <div className="three-col">
            <article className="info-card">
              <h3 className="h3">How it works</h3>
              <ul className="tick-list">
                <li>Membership runs 1 July to 30 June</li>
                <li>Members must be 16 or over</li>
                <li>Multiple tickets are available to buy, and each one is entered into every draw</li>
                <li>At least 20% of proceeds go to running and improving the hall and grounds</li>
              </ul>
            </article>
            <article className="info-card">
              <h3 className="h3">How to join</h3>
              <ol className="num-list">
                <li><a href={CLUB_500.formUrl} target="_blank" rel="noreferrer">Download the application form</a>.</li>
                <li>Email it to <a href={`mailto:${CLUB_500.email}`}>{CLUB_500.email}</a>.</li>
                <li>Pay by standing order (set to leave on 1 July) or a one-off bank transfer. To pay cash, contact the administrator.</li>
              </ol>
            </article>
            <article className="info-card">
              <h3 className="h3">Draws</h3>
              <p>Draws take place in the first week after each month ends. The Christmas draw is on 21 December. Winners are told by email and listed below and in the Downland Benefice Magazine.</p>
              <a className="text-link" href={`mailto:${CLUB_500.email}`}>Renew or join <Arrow /></a>
            </article>
          </div>
          <div className="cta-row">
            <a className="btn btn-donate btn-lg" href={CLUB_500.formUrl} target="_blank" rel="noreferrer">Download the application form</a>
          </div>

          <div id="winners" className="winners">
            <h3 className="display sm">Previous <span className="thin">winners</span></h3>
            <div className="table-wrap">
              <table className="contacts">
                <thead><tr><th>Draw</th><th>First prize (£50)</th><th>Second prize (£25)</th></tr></thead>
                <tbody>
                  {CLUB_500.winners.map((w) => (
                    <tr key={w.month}>
                      <td><strong>{w.month}</strong></td>
                      <td>No. {w.first.no} · {w.first.name}</td>
                      <td>No. {w.second.no} · {w.second.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Volunteer (Help your Hall + the Booking page appeal) ---------- */}
      <section id="volunteer" className="section">
        <div className="wrap two-col center">
          <div>
            <p className="eyebrow">Volunteer</p>
            <h2 className="display sm">Could you <span className="thin">lend a hand?</span></h2>
            <p>Whatever your skills, there's a way to help. We're looking for volunteers for:</p>
            <ul className="tick-list">
              <li>Building the bonfire and helping on 5 November</li>
              <li>Easter and Christmas community events</li>
              <li>Working parties and hall projects</li>
              <li>Running groups or hosting events</li>
              <li>Our environmentally friendly goals</li>
              <li>Improving our social media and website</li>
            </ul>
            <p>Around 70 villagers and friends help run the fireworks each year. The village's first Christmas tree lighting was in 2023; in 2024 it grew into a Christmas market with 34 stallholders, who raised £170 for a local charity.</p>
            <div className="cta-row">
              <a className="btn btn-dark" href="mailto:william@fourhoopers.co.uk">Join in! <Arrow /></a>
              <a className="btn btn-ghost" href="mailto:mark@hutch.me">Help with the fireworks</a>
            </div>
            <p className="muted small">Or have a chat with one of us in person. You can read how the hall is run on our <a href={href('about')}>About</a> page.</p>
          </div>
          <Photo label="Volunteers at the hall" shape="tall" tone="mint" />
        </div>
      </section>
    </>
  );
}
