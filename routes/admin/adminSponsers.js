const getAll              = require('../services/getAll');
const getAllWhere         = require('../services/getAllWhere');
const update              = require('../services/update');
const insert              = require('../services/insert');
const deleteItem          = require('../services/delete');
const authenticate 	      = require('../../middleware/authenticate');
const authenticateAuthor  = require('../../middleware/authenticateAuthor');



module.exports = (server) => {
    
// SPONSER MAIN ==================

    server.get('/admin/sponsers',authenticateAuthor, async function(req,res){
            var productPageCheck = ""    
            
            try {
                let sponsers = await getAll.sponsersALL();  

                res.render('pages/admin/adminSponsers',{
                    'productPageCheck'    : productPageCheck,
                    'sponsers'            : sponsers
                })
            } catch (error) {
                if(error){
                    console.log(error)
                }
            }
        })

// SPONSER UPDATE ==================

    server.get('/admin/sponser/update/:id',authenticateAuthor, async function(req,res){
        var productPageCheck = "update";
        var sponser_id      = req.params.id;
        try{
            const sponser  = await getAllWhere.sponser(sponser_id);
            const category  = await getAll.category();
                // console.log(products)
            res.render('pages/admin/adminSponsers',{
                'sponser'     : sponser,
                page        : { 'title': 'Update Sponser' },
                productPageCheck,
                'category'    : category
            })
            
        }catch(e){
            console.log(e)
        }
        
    });

// UPDATE SITE ================

    server.get('/admin/sponser/update/site/hallo',authenticateAuthor, async function(req,res){
        var productPageCheck = "updateSite";
        var sponser_id      = req.params.id;
        console.log('update page læst')
        try{
            let sponserText = await getAll.sponserText()
            let sponserSale = await getAll.sponserSale();
            console.log(productPageCheck)
                // console.log(products)
            res.render('pages/admin/adminSponsers',{
                'page'        : { 'title': 'Update Sponser Site' },
                productPageCheck,
                'sponserText' : sponserText,
                'sponserSale' : sponserSale,

            })
            
        }catch(e){
            console.log(e)
        }
        
    })

// SPONSER CREATE ==================
    
    server.get('/admin/sponser/create',authenticateAuthor, async function(req,res){
        var productPageCheck = "create"        
            try{
                const category  = await getAll.category();
                    // console.log(products)
                res.render('pages/admin/adminSponsers',{
                    'page'        : { 'title': 'Create Sponser' },
                    productPageCheck,
                    'category'  : category
                })
                
            }catch(e){
                console.log(e)
            }
            
        })

// ********************************************************************************* POST ************************************************************************

// UPDATE SPONSER ===========================================?

server.post('/JSON/update/sponser/:id', authenticateAuthor, async function(req,res){
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

// INSERT SPONSER ===========================================?

    server.post('/JSON/insert/sponser', authenticateAuthor, async function(req,res){
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
    
// UPDATE SPONSER SITE TEXT ===================================

    server.post('/JSON/update/sponser/site/now/:id',authenticateAuthor, async function(req,res){
        let sponserSiteId   = req.params.id
        let sponserText     = req.body.sponserText;

        console.log(req.body)
        try {
            await update.sponserText(sponserText, sponserSiteId)

            res.redirect('/admin/sponser/update/site/hallo')
        } catch (error) {
            console.log(error)
        }
    });

// UPDATE SPONSER SITE PRICE ===================================

    server.post('/JSON/update/sponser/siteprice/:id',authenticateAuthor, async function(req,res){
        let sponserPriceId      = req.params.id
        let sponserPriceViews   = req.body.sponserPriceViews;
        let sponserPrice        = req.body.sponserPrice;

        console.log('siteprice læst')
        console.log(req.body)
        try {
            await update.sponserPrice(sponserPrice, sponserPriceViews, sponserPriceId)

            res.redirect('/admin/sponser/update/site/hallo')
        } catch (error) {
            console.log(error)
        }
    });

}