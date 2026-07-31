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
  apiKey:            "TU_API_KEY_AQUI",
  authDomain:        "TU-PROYECTO.firebaseapp.com",
  databaseURL:       "https://TU-PROYECTO-default-rtdb.firebaseio.com",
  projectId:         "TU-PROYECTO",
  storageBucket:     "TU-PROYECTO.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId:             "TU_APP_ID"
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
