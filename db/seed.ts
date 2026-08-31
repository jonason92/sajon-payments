import { getDb } from "../api/queries/connection";
import { titles } from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  await db
    .insert(titles)
    .values([
      {
        slug: "mikrotypografie-akademische-editionen",
        title: "Die unsichtbare Ordnung",
        subtitle: "Mikrotypografie in akademischen Editionen",
        type: "artikel",
        premium: true,
        excerpt:
          "Warum Zeilenabstand, Laufweite und Binnenraum über die Glaubwürdigkeit wissenschaftlicher Texte entscheiden — eine typografische Untersuchung.",
        author: "Dr. Elena Marbach",
        route: "/artikel/hard",
        coverImage: "/cover-typographie.png",
        publishedAt: new Date("2025-11-14"),
      },
      {
        slug: "buecher-lesen-leuchten",
        title: "Warum wir Bücher anders lesen, seit sie leuchten",
        subtitle: null,
        type: "artikel",
        premium: true,
        excerpt:
          "Vom gedruckten Vorfahren zum leuchtenden Buch: ein Essay über Lesegeräte, Aufmerksamkeit und die Zukunft des akademischen Textes.",
        author: "Sajon Redaktion",
        route: "/artikel/metered",
        coverImage: "/cover-edition.png",
        publishedAt: new Date("2025-11-03"),
      },
      {
        slug: "vom-setzen-und-sammeln",
        title: "Vom Setzen und Sammeln",
        subtitle: "Eine kurze Geschichte des Verlegens — Leseprobe, Kapitel 1 von 12",
        type: "leseprobe",
        premium: false,
        excerpt:
          "Die Geschichte eines Verlags, der weniger Firma als Haushalt war — frei zugänglich, als Einladung in den Essay-Band „Leseproben & Essays“.",
        author: "Sajon Redaktion",
        route: "/leseprobe",
        coverImage: "/cover-leseprobe.png",
        publishedAt: new Date("2025-10-20"),
      },
      {
        slug: "handschrift-rotstift-setzmaschine",
        title: "Handschrift, Rotstift, Setzmaschine",
        subtitle: "Eine Werkstattgeschichte",
        type: "ebook",
        premium: true,
        excerpt:
          "Vom Manuskript zum Satz: Stationen einer editorischen Werkstatt zwischen Handschrift, Korrektur und Setzmaschine.",
        author: "Prof. J. R. Altherr",
        route: "#",
        coverImage: "/cover-typographie.png",
        publishedAt: new Date("2025-09-12"),
      },
      {
        slug: "bleisatz-variablensatz",
        title: "Vom Bleisatz zum Variablensatz",
        subtitle: "Eine Technikgeschichte",
        type: "ebook",
        premium: true,
        excerpt:
          "Fünfhundert Jahre Schrifttechnik in einem Band — vom Bleilettern-Kasten bis zu variablen Fonts für den Bildschirm.",
        author: "Dr. Elena Marbach",
        route: "#",
        coverImage: "/cover-edition.png",
        publishedAt: new Date("2025-08-28"),
      },
    ])
    .onDuplicateKeyUpdate({
      set: { title: titles.title },
    });

  console.log("Done.");
  process.exit(0); // close MySQL connection pool
}

seed();
