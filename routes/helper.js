module.exports = (server) => {

// INDEX ===============================================================

    require('./client/index')(server);
    require('./client/biler')(server);
    require('./client/både')(server);
    require('./client/bikes')(server);
    require('./client/arkivet')(server);
    require('./client/redaktion')(server);
    require('./client/kontakt')(server);

// LOGIN ===============================================================

    require('./login/validationTest')(server)
    require('./login/google')(server);
    require('./login/login')(server);
    require('./login/register')(server);
    // require('./login/root')(server);

// ADMIN ===============================================================

    require('./admin/adminDashboard')(server);
    require('./admin/adminSponsers')(server);
    require('./admin/adminUsers')(server);
    require('./admin/adminSupport')(server);
    require('./admin/adminArticles')(server);
    require('./admin/adminArticles')(server);
}
