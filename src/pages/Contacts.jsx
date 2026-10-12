import { CONTACTS, SITE } from '../data/content.js';
import { PageHeader } from '../components/Bits.jsx';

export default function Contacts() {
  return (
    <>
      <PageHeader eyebrow="What's on" title="Contacts" accent="for every class"
        intro={`Contacts for all classes taking place at the hall. For help with bookings, contact ${SITE.bookingsManager} on ${SITE.phone}.`} />
      <section className="section">
        <div className="wrap">
          <div className="table-wrap">
            <table className="contacts">
              <thead><tr><th>Class or group</th><th>Contact</th><th>Phone / email</th></tr></thead>
              <tbody>
                {CONTACTS.flatMap((g) =>
                  g.people.map((p, i) => (
                    <tr key={g.group + p.name}>
                      <td>{i === 0 ? <strong>{g.group}</strong> : ''}</td>
                      <td>{p.name}</td>
                      <td>
                        {p.tel && <a href={`tel:${p.tel.replace(/\s/g, '')}`}>{p.tel}</a>}
                        {p.email && (p.note ? <span>{p.email} <em className="muted">({p.note})</em></span> : <a href={`mailto:${p.email}`}>{p.email}</a>)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="info-pair">
            <div><h3>For help with bookings</h3><p>{SITE.bookingsManager} · <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></p></div>
            <div><h3>Operations and help on the day</h3><p>{SITE.bookingsManager}, Bookings Manager · <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></p></div>
          </div>
        </div>
      </section>
    </>
  );
}
