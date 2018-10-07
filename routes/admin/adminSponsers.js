getAll          = require('../services/getAll');
getAllWhere     = require('../services/getAllWhere');
update          = require('../services/update');
insert          = require('../services/insert');
deleteItem      = require('../services/delete')

module.exports = (server) => {

    server.get('/admin/sponsers',async function(req,res){
            var productPageCheck = ""    
            
            try {
                let sponsers = await getAll.sponsers();  

                console.log(sponsers)
                res.render('pages/admin/adminSponsers',{
                    productPageCheck    : productPageCheck,
                    sponsers            : sponsers
                })
            } catch (error) {
                if(error){
                    console.log(error)
                }
            }
        })

    server.get('/admin/sponser/update/:id',async function(req,res){
        var productPageCheck = "update";
        var sponser_id      = req.params.id;
        try{
            const sponser  = await getAllWhere.sponser(sponser_id);
            const category  = await getAll.category();
                // console.log(products)
            res.render('pages/admin/adminSponsers',{
                sponser     : sponser,
                page        : { 'title': 'test' },
                productPageCheck,
                category    : category
            })
            
        }catch(e){
            console.log(e)
        }
        
    })
    server.get('/admin/sponser/create',async function(req,res){
        var productPageCheck = "create"        
            try{
                const category  = await getAll.category();
                    // console.log(products)
                res.render('pages/admin/adminSponsers',{
                    page        : { 'title': 'test' },
                    productPageCheck,
                    'category'  : category
                })
                
            }catch(e){
                console.log(e)
            }
            
        })

// UPDATE SPONSER ===========================================?

server.post('/JSON/update/sponser/:id', async function(req,res){
        let sponser_id          = req.params.id;
        let sponser_name        = req.body.name;
        let sponser_category    = req.body.category;
        var sampleFile          = req.files.sampleFile;
        let submit              = req.body.sub;

        console.log('submit========',submit)
        console.log('sampleFile==============',req.files.sampleFile)
// SUBMIT SPONSER ---------
        if(submit == 'Opdater Sponser'){
            console.log('submit = opdater')
            if (req.files.sampleFile == undefined){

                try {
                    console.log('ingen filer')
                    let sponser = await getAll.sponsers(sponser_id)
                    req.files.sampleFile = {'name' : sponser[0].sponsers_img} 
                    var sampleFile = req.files.sampleFile
                    console.log(sampleFile.name)
                    let updateSponser = await update.sponser(sponser_id, sponser_name, sponser_category, sampleFile)
                    res.redirect('/admin/sponsers')
                    
                } catch (error) {
                    console.log(error)
                }
            }else{
                console.log('filer fundet')
                sampleFiles = sampleFile.name
                console.log('sampleFile================',sampleFile)
        
                sampleFile.mv(`public/resources/media/ads/sponsers/${sampleFile.name}`, async function(err) {
                    try {
                        let updateSponser = await update.sponser(sponser_id, sponser_name, sponser_category, sampleFile)
                        res.redirect('/admin/sponsers')
                    } catch (error) {
                        console.log(error)
                    }
                })

            }
// DELETE SPONSER -------------
        }else if( submit == 'Slet'){
            console.log('submit = slet')
            try {
                const deleteSponser = await deleteItem.sponser(sponser_id)
                res.redirect('/admin/sponsers')
            } catch (error) {
                console.log(error)
            }
        }
        
    })

// INDSÆT SPONSER ===========================================?

    server.post('/JSON/insert/sponser', async function(req,res){
        let sponser_name       = req.body.name;
        let sponser_category    = req.body.category;
        let sampleFile          = req.files.sampleFile


        console.log(req.files)
        if (!req.files)
        return res.status(400).send('No files were uploaded.');

        sampleFiles = sampleFile.name


        // sampleFile = 
		console.log(sampleFiles)
		sampleFile.mv(`public/resources/media/ads/sponsers/${sampleFile.name}`, async function(err) {

            try {
                console.log('læst')
                let insertSponser   = await insert.sponser(sponser_name, sponser_category, sampleFile)
                res.redirect('/admin/sponsers')
            } catch (error) {
                console.log(error)
            }
        })
    })

}