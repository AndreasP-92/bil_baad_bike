module.exports = (server) => {

// INDEX ===============================================================

    require('./client/index')(server);
    require('./client/biler')(server);
    require('./client/både')(server);
    require('./client/bikes')(server);
    require('./client/arkivet')(server);
    require('./client/redaktion')(server);
    require('./client/kontakt')(server);
    require('./client/sponser')(server);
    require('./client/search')(server);

// LOGIN ===============================================================

    require('./login/login')(server);
    require('./login/register')(server);

// ADMIN ===============================================================

    require('./admin/adminDashboard')(server);
    require('./admin/adminSponsers')(server);
    require('./admin/adminUsers')(server);
    require('./admin/adminArticles')(server);
}
