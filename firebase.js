// ================================================================
// ====   PEGÁ ACÁ TU CONFIGURACIÓN DE FIREBASE   ================
// ================================================================
//
//  Cómo obtenerla:
//  1. Ir a https://console.firebase.google.com/
//  2. Crear un proyecto (o elegir uno existente)
//  3. Menú izquierdo → Configuración del proyecto (ícono ⚙)
//  4. Pestaña "General" → sección "Tus apps" → Agregar app web (</>)
//  5. Copiar el objeto firebaseConfig y reemplazar los valores abajo
//  6. En el menú izquierdo activar "Realtime Database" → Crear base de datos
//
// ================================================================

const firebaseConfig = {
  apiKey:            "AIzaSyAIrbzCU6LxFVYCB9hRMYlCCnWLrLT-YAg",
  authDomain:        "cementerio-b516d.firebaseapp.com",
  databaseURL:       "https://cementerio-b516d-default-rtdb.firebaseio.com",
  projectId:         "cementerio-b516d",
  storageBucket:     "cementerio-b516d.firebasestorage.app",
  messagingSenderId: "1092059482070",
  appId:             "1:1092059482070:web:3ce4ed146fd4b963fa8677",
  measurementId:     "G-PXQ4MC56CR"
};

// ================================================================
// ====   NO MODIFICAR DEBAJO DE ESTA LÍNEA   ====================
// ================================================================

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Offset entre reloj local y servidor (para timer sincronizado)
let serverTimeOffset = 0;
db.ref('/.info/serverTimeOffset').on('value', snap => {
  serverTimeOffset = snap.val() || 0;
});

function serverNow() {
  return Date.now() + serverTimeOffset;
}
