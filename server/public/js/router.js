// Definire una costante router come oggetto VueRouter
const router = new VueRouter({
  // la modalità di default è 'hash': non c'è un refresh vero e proprio
  // della pagina: ciò è molto comodo per implementare un sistema di cache
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/movies', component: Movies },

    // gestione rotte sconosciute: reindirizza alla route 404
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' },
 ]
});
