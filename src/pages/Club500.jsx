import { CLUB_500 } from '../data/content.js';
import { PageHeader, Arrow } from '../components/Bits.jsx';

export default function Club500() {
  return (
    <>
      <PageHeader eyebrow="Fundraising · 500 Club" title="Join the" accent="500 Club" tone="butternut"
        intro="Help fund the Village Hall and Recreation Ground. Each member gets a numbered ticket in our monthly prize draws.">
        <div className="hero-actions">
          <a className="btn btn-donate btn-xl" href={CLUB_500.formUrl} target="_blank" rel="noreferrer">Download the application form</a>
        </div>
      </PageHeader>

      <section id="join" className="section">
        <div className="wrap">
          <div className="prize-row">
            <div className="prize prize-main"><span className="prize-amt">{CLUB_500.ticket}</span><span>per ticket, per year</span><small>{CLUB_500.halfYear} for half-year (joining 1 January – 30 June)</small></div>
            {CLUB_500.prizes.map((p) => (
              <div key={p.label} className="prize"><span className="prize-amt">{p.amount}</span><span>{p.label}</span>{p.note && <small>{p.note}</small>}</div>
            ))}
          </div>

          <div className="three-col">
            <article className="info-card">
              <h2 className="h3">How it works</h2>
              <ul className="tick-list">
                <li>Membership runs 1 July to 30 June</li>
                <li>Members must be 16 or over</li>
                <li>You can hold more than one ticket</li>
                <li>At least 20% of proceeds go to running and improving the hall and grounds</li>
              </ul>
            </article>
            <article className="info-card">
              <h2 className="h3">How to join</h2>
              <ol className="num-list">
                <li>Download the application form.</li>
                <li>Email it to <a href={`mailto:${CLUB_500.email}`}>{CLUB_500.email}</a>.</li>
                <li>Pay by standing order (set to leave on 1 July) or a one-off bank transfer. To pay cash, contact the administrator.</li>
              </ol>
            </article>
            <article className="info-card">
              <h2 className="h3">Draws</h2>
              <p>Draws take place in the first week after each month ends. The Christmas draw is on 21 December. Winners are told by email and listed here and in the Downland Benefice Magazine.</p>
              <a className="text-link" href={`mailto:${CLUB_500.email}`}>Renew or join <Arrow /></a>
            </article>
          </div>
        </div>
      </section>

      <section id="winners" className="band band-mint">
        <div className="wrap">
          <h2 className="display sm">Previous <em>winners</em></h2>
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
      </section>
    </>
  );
}
