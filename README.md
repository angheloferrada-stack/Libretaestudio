# Bailes del Conjunto (PWA)
1. Firebase Console: crea proyecto, activa **Firestore**, **Authentication (email/contraseña)** y **Storage** (requiere Blaze; crea una alerta de presupuesto).
2. En Configuración del proyecto > Tus apps > Web: copia el `firebaseConfig` y pégalo en `index.html`.
3. En Authentication crea a mano los usuarios que podrán subir (los "del equipo").
4. Pega estas reglas.

**Firestore**
```
rules_version='2';
service cloud.firestore { match /databases/{d}/documents {
  match /bailes/{id} { allow read: if true; allow write: if request.auth != null; } } }
```
**Storage**
```
rules_version='2';
service firebase.storage { match /b/{b}/o {
  match /videos/{f} { allow read: if true;
    allow write: if request.auth != null && request.resource.size < 150*1024*1024
                 && request.resource.contentType.matches('video/.*');
    allow delete: if request.auth != null; } } }
```
5. Sube la carpeta a GitHub y activa GitHub Pages. En Authentication > Settings > Authorized domains agrega `tuusuario.github.io`.
