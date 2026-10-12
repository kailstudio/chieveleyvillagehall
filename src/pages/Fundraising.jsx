import { href } from '../router.js';
import { PageHeader, Photo, Arrow } from '../components/Bits.jsx';

export default function Fundraising() {
  return (
    <>
      <PageHeader eyebrow="Fundraising" title="Help" accent="your hall" tone="butternut"
        intro="Whatever your skills, there's a way to help: building bonfires, joining working parties, delivering projects, running groups or hosting events. It doesn't matter how long you've lived in the village.">
        <div className="hero-actions">
          <a className="btn btn-donate btn-lg" href={href('500-club/join')}>Donate · 500 Club</a>
          <a className="btn btn-dark btn-lg" href="mailto:william@fourhoopers.co.uk">Join in!</a>
        </div>
      </PageHeader>

      <section id="help" className="section">
        <div className="wrap two-col center">
          <div>
            <p className="eyebrow">Help your hall</p>
            <h2 className="display sm">Get <em>involved</em></h2>
            <p>Read about how the hall is run on our <a href={href('governance')}>Governance</a> page, email us using the Join in! button, or have a chat with one of us in person.</p>
            <h3 className="h3">Christmas market &amp; tree lighting</h3>
            <p>The village's first Christmas tree lighting was in 2023. In 2024 it grew into a Christmas market with 34 stallholders, who raised £170 for a local charity.</p>
            <a className="text-link" href={href('seasonal-events')}>Christmas &amp; Easter events <Arrow /></a>
          </div>
          <Photo label="Volunteers at the hall" shape="arch" tone="mint" />
        </div>
      </section>

      <section id="fireworks" className="band band-dark">
        <div className="wrap two-col center">
          <Photo label="5 November fireworks" shape="arch" tone="butternut" />
          <div>
            <p className="eyebrow light">Every 5 November</p>
            <h2 className="display sm light">Bonfire <em>&amp; fireworks</em></h2>
            <p className="light">Our traditional bonfire and fireworks display is a major fundraiser for the Village Hall. 2018 marked its 50th anniversary, and around 70 villagers and friends help run it each year.</p>
            <p className="light">Tickets are sold through <a href="https://www.mychieveley.co.uk" target="_blank" rel="noreferrer">mychieveley.co.uk</a> from late October.</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="https://www.mychieveley.co.uk" target="_blank" rel="noreferrer">Buy tickets <Arrow /></a>
              <a className="btn btn-ghost-light" href="mailto:mark@hutch.me">Volunteer</a>
            </div>
          </div>
        </div>
      </section>

      <section id="benches" className="section">
        <div className="wrap two-col center">
          <div>
            <p className="eyebrow">Benches</p>
            <h2 className="display sm">Dedicate <em>a bench</em></h2>
            <p>Details of our benches appeal are coming soon. To ask about dedicating a bench, contact the hall.</p>
            <a className="btn btn-dark" href="mailto:chieveleyvillagehall@gmail.com">Ask about benches</a>
          </div>
          <Photo label="Bench on the recreation ground" shape="soft" tone="pink" />
        </div>
      </section>
    </>
  );
}
