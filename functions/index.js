const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();
const APP_URL = "https://angheloferrada-stack.github.io/Libretaestudio/";

function fecha(f) {
  try {
    return new Date(f + "T12:00:00").toLocaleDateString("es-CL", {
      weekday: "long", day: "numeric", month: "long", timeZone: "America/Santiago",
    });
  } catch { return f || ""; }
}

exports.avisarNuevaPresentacion = onDocumentCreated("presentaciones/{id}", async (event) => {
  const p = event.data && event.data.data();
  if (!p) return;
  const ensayo = p.tipo === "ensayo";
  const title = ensayo ? "Ensayo especial 📣" : "Nueva presentación 💃";
  const partes = [fecha(p.fecha)];
  if (ensayo && p.hora) partes.push(p.hora);
  if (p.titulo) partes.push(p.titulo);
  if (ensayo && p.lugar) partes.push(p.lugar);
  const body = partes.filter(Boolean).join(" · ");

  const db = getFirestore();
  const snap = await db.collection("tokens").get();
  const tokens = snap.docs.map((d) => d.id);
  if (!tokens.length) return;

  for (let i = 0; i < tokens.length; i += 500) {
    const lote = tokens.slice(i, i + 500);
    const res = await getMessaging().sendEachForMulticast({
      tokens: lote,
      notification: { title, body },
      webpush: { fcmOptions: { link: APP_URL } },
    });
    const borrar = [];
    res.responses.forEach((r, k) => {
      const c = r.error && r.error.code;
      if (c === "messaging/registration-token-not-registered" || c === "messaging/invalid-registration-token") borrar.push(lote[k]);
    });
    await Promise.all(borrar.map((t) => db.collection("tokens").doc(t).delete()));
  }
});
