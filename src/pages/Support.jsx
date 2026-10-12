import { SITE, CLUB_500 } from '../data/content.js';
import { href } from '../router.js';
import { PageHeader, JumpLinks, Photo, Arrow } from '../components/Bits.jsx';

export default function Support() {
  return (
    <>
      <PageHeader photo="hero-support" eyebrow="Support us" title="Help" accent="your hall."
        intro="The hall is a registered charity, run by volunteers. Join the 500 Club, lend a hand at an event or dedicate a bench. It doesn't matter how long you've lived in the village.">
        <div className="hero-actions">
          <a className="btn btn-solid-light" href={href('support/500-club')}>Join the 500 Club <Arrow /></a>
          <a className="btn btn-outline-light" href={href('support/volunteer')}>Volunteer</a>
        </div>
      </PageHeader>
      <JumpLinks page="support" links={[['donate', 'Donate'], ['500-club', '500 Club'], ['winners', 'Winners'], ['volunteer', 'Volunteer'], ['bench', 'Dedicate a bench']]} />

      {/* ---------- Donate ---------- */}
      <section id="donate" className="section">
        <div className="wrap three-col">
          <article className="info-card">
            <span className="big-stat">{CLUB_500.ticket}</span>
            <h2 className="h3">A 500 Club ticket</h2>
            <p>The simplest way to give. A year's membership enters you into monthly prize draws, and at least 20% goes to the hall and grounds.</p>
            <a className="text-link" href={href('support/500-club')}>Join the 500 Club <Arrow /></a>
          </article>
          <article className="info-card">
            <h2 className="h3">A donation of any size</h2>
            <p>We've secured several grants for hall improvements, and donations of any size help us go further. To give, contact Neal Courtney, Chair.</p>
            <p className="small"><a href="mailto:chair.crc@outlook.com">chair.crc@outlook.com</a><br /><a href="tel:07831677037">07831 677037</a></p>
          </article>
          <article className="info-card">
            <h2 className="h3">Come to bonfire night</h2>
            <p>Our bonfire and fireworks display is a major fundraiser for the hall. Every ticket helps.</p>
            <a className="text-link" href={href('whats-on/upcoming')}>Upcoming events <Arrow /></a>
          </article>
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
                <li>You can hold more than one ticket</li>
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

      {/* ---------- Dedicate a bench ---------- */}
      <section id="bench" className="band band-pink">
        <div className="wrap two-col center">
          <Photo label="Bench on the recreation ground" shape="soft" tone="pink" />
          <div>
            <p className="eyebrow">Benches</p>
            <h2 className="display sm">Dedicate <span className="thin">a bench</span></h2>
            <p>Details of our benches appeal are coming soon. To ask about dedicating a bench, contact the hall.</p>
            <a className="btn btn-dark" href={`mailto:${SITE.email}`}>Ask about benches</a>
          </div>
        </div>
      </section>
    </>
  );
}
