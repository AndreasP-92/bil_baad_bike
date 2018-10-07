const getAll        = require('../services/getAll');
const getOne        = require('../services/getone');
const getAllWhere   = require('../services/getAllWhere');
const deleteItem    = require('../services/delete');
const update        = require('../services/update');

module.exports = (server) => {



// SHOW ALL USERS =======================================

    server.get('/admin/users', async function(req,res){
        let userSite ="allUsers"
        try{
            const Users = await getAll.users();
            const authors = await getAll.author();

            res.render('pages/admin/adminUsers',{
                userSite    : userSite,
                users       : Users,
                authors     : authors
            
            })
        }catch(e){
            console.log(e)
        }

    });

// EDIT ONE USER =======================================

    server.get('/admin/users/:id', async function(req,res){

        let userId  = req.params.id;
        let userSite ="oneUser"
        try{
            // const Users = await getOne.user(userId);
            const author    = await getAllWhere.author(userId);
            const category  = await getAll.category();
            console.log(author)


            // res.send()
            res.render('pages/admin/adminUsers',{
                'userSite'    : userSite,
                'author'      : author,
                'category'    : category
            
            })
        }catch(e){
            console.log(e)
        }

    })

    server.post('/JSON/update/author/:id', async function(req,res){

        let authorId    = req.params.id;
        let name        = req.body.name;
        let submit      = req.body.sub;
        var userRole    = req.body.userRole;
        let email       = req.body.email;
        var sampleFile  = req.files.sampleFile;
        let textBox     = req.body.textbox;
        let category    = req.body.category;

        console.log(req.body)
        let userSite ="oneUser"

        if(submit == 'Opdater'){

            if(userRole == undefined){
                userRole = 2
            }else if(userRole == 'on'){
                userRole = 1
            }

            if (req.files.sampleFile == undefined){

                try {
                    console.log('ingen filer')
                    let author = await getAllWhere.author(authorId)
                    req.files.sampleFile = {'name' : author[0].author_profile_img} 
                    var sampleFile = req.files.sampleFile
                    console.log(sampleFile.name)
                    await update.author(authorId, name, userRole, email, sampleFile, textBox, category);
                    res.redirect('/admin/users')
                    
                } catch (error) {
                    console.log(error)
                }
            }else{

                console.log('filer fundet')
                sampleFiles = sampleFile.name
                console.log('sampleFile================',sampleFile)
        
                sampleFile.mv(`public/resources/media/redaktion/${sampleFile.name}`, async function(err) {
                    try {
                        const author = await update.author(authorId, name, userRole, email, sampleFile, textBox, category);
                        res.redirect('/admin/users')
                    } catch (error) {
                        console.log(error)
                    }
                })

            }
        }else if(submit == 'Slet'){

            console.log('delete')

            try{
                // const Users = await getOne.user(userId);
                await deleteItem.author(authorId);


                res.redirect('/admin/users')
                
                
            }catch(e){
                console.log(e)
            }
        }


    })
}