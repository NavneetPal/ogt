const Product=require('../models/product');
module.exports={
    showProducts:async(req,res)=>{
        if(Object.keys(req.query).length===0){
            const products=await Product.find({},'title image price');
            console.log(products);
            res.status(200).json({
                data:products
            });
        }else{
            const {minprice,maxprice}=req.query;
            const products=await Product.find({price:{$gte:minprice,$lte:maxprice}});
            console.log(products);
            res.render('store',{products})
        }
       
    },
    showAddForm:(req,res)=>{
        res.render('product/add')
    },
    addProduct:(req,res)=>{
        Product.create(req.body)
        .then(product=>{
            res.redirect('/product');
        })
        .catch(err=>{
            res.render('product/addProduct');
        })
    },
    showProductById:async(req,res)=>{
        const id=req.params.id;
        const product=await Product.findById(id).populate('comments');
        if(product){
            res.status(200).json({
                data:product
            })
        }else{
            res.status(500).json({
                message:'Product not find'
            })
        }
    },
    showEditForm:(req,res)=>{
        Product.findById(req,params.id,(err,foundProduct)=>{
            if(err){
                res.redirect('/products')
            }
           res.render('product/edit',{product:foundProduct});
        })
    },
    editProductById:(req,res)=>{
        Product.findByIdAndUpdate(req.params.id,req.body,(err,product)=>{
            if(err){
                res.redirect('/products');
            }
            res.redirect(`/products/${req.params.id}`)
        })
    },
    deleteProductById:(req,res)=>{
        Product.findByIdAndRemove(req.params.id,(err,data)=>{
            if(err){
                res.redirect('/products');
            }else{
                res.redirect('/products');
            }
        })
    }
}