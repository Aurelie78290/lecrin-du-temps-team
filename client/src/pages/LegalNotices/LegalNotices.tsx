import "./LegalNotices.css";

function LegalNotices() {
  return (
    <div className="legalnotices-page">
      <section className="legalnotices-head">
        <h1 className="legalNotices-title">Mentions légales</h1>
        <p>
          Site réalisé dans le cadre d'un projet pédagogique. Les informations
          ci-dessous sont fictives.
        </p>
      </section>
      <section className="legalnotices-mainsection">
        <div className="legalnotices-content">
          <h2 className="legalnotices-subtitle">Editeur du site</h2>
          <p>
            <strong>Écrin du Temps</strong>
            <br />
            SARL Écrin du Temps
            <br />
            24 allée du Temps Suspendu
            <br />
            75000 Chronopolis
            <br />
          </p>
        </div>
        <div className="legalnotices-content">
          <h2 className="legalnotices-subtitle">
            Responsable de la publication.
          </h2>
          <p>
            Éloïse Minutier
            <br />
            <a href="mailto:eloiseminutier@ecrindutemps.com">
              eloiseminutier@ecrindutemps.com
            </a>
          </p>
        </div>
        <div className="legalnotices-content">
          <h2 className="legalnotices-subtitle">Webmaster</h2>
          <p>
            Louis Cadran
            <br />
            <a href="mailto:webmaster@ecrindutemps.com">
              webmaster@ecrindutemps.com
            </a>
          </p>
        </div>
        <div className="legalnotices-content">
          <h2 className="legalnotices-subtitle">Hébergement</h2>
          <p>
            Horlogia Hosting (hébergeur fictif)
            <br />
            24 rue des Datacenters
            <br />
            75000 Chronopolis
            <br />
            Téléphone : 00 00 00 00 00
          </p>
        </div>
        <div className="legalnotices-content">
          <h2 className="legalnotices-subtitle">
            Délégué à la protection des données
          </h2>
          <p>
            Éloïse Minutier
            <br />
            <a href="mailto:eloiseminutier@ecrindutemps.com">
              eloiseminutier@ecrindutemps.com
            </a>
          </p>
        </div>
      </section>
      <section className="legalnotices-conclusion">
        <p>
          Les mentions légales ont été générées à partir du modèle proposé par
          <a
            href="https://fr.orson.io/1371/generateur-mentions-legales"
            target="_blank"
            rel="noopener noreferrer"
          >
            Orson.io
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default LegalNotices;
