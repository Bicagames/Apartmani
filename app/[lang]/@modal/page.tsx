// Closes the lightbox when a <Link> goes from it to the home page (the CTA to
// /sr#rezervacije). On a client navigation a slot that no longer matches keeps
// its previous content, so the home URL needs an explicit "render nothing".
// The lightbox has no other outgoing links, so no catch-all slot page is needed.
export default function CloseModal() {
  return null;
}
