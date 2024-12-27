const port = 4000;
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer");
const path = require("path")//access to our backend directory in our express app
const cors = require("cors");
const { type } = require("os");

app.use(express.json());//whatever request we will get from response that will be automatically passed through json//for api to run on server
app.use(cors());//it will connect our react project to express app on 4000port

//database connection with mongodb
mongoose.connect("mongodb+srv://rutvidave:rutvi%40dave03@cluster0.iygot2o.mongodb.net/e-commerce")

//rutvi@dave03

// Api creation

app.get("/",(req,res)=>{
   res.send("express app is running")
})

// imge storage engine
//middleware is storage and will rename that img with the new name(return cb) and that img will be stored in imgs fldr

const Admin = mongoose.model('Admin',{
    name:{
        type:String,
    },
    password:{
        type:String,
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    loggedIn:{
        type:Boolean,
        default:false,
    },
})

app.post('/adminlogin',async(req,res)=>{

    const count = await Admin.countDocuments({ loggedIn:true });
    if(count>=10){
        return res.status(403).json({success: false,})
    }
    let admin = await Admin.findOne({name:req.body.username, password:req.body.password})
    if(!admin){
        return res.status(400).json({success:false,errors:"admin does not exsits"})
    }
    /*const admin = new Admin({
        name:req.body.username,
        password:req.body.password
    })*/
    if(admin.loggedIn){
        const token = jwt.sign({admin:{id:admin.id}},'secret-ecom')
    }
    await admin.save();

   /* const data ={
        admin:{
            id:admin.id
        }
    }*/

    const token = jwt.sign({ admin: { id: admin.id } },'secret-ecom')
    res.json({success:true,token})
})



const storage = multer.diskStorage({
    destination:'./upload/imgs',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//upload enpoint

app.use('/imgs',express.static('upload/imgs'))//uploaded imgs will get stored in imgs folder that will get at/imgs//endpoint

app.post("/upload",upload.single('product'),(req,res)=>{
     res.json({
        success:1,//if img uploaded succesfully
        img_url:`http://localhost:${port}/imgs/${req.file.filename}`//file is a property added to the req object by multer middleware. It represents the uploaded file.filename is a property of the file object created by multer. It contains the name of the file as stored on the server.
     })
})
//schema for creating products


const Product = mongoose.model('Product',{
    id:{
        type:Number,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    new_price:{
        type:Number,
        require:true,
    },
    old_price:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    available:{
        type:Boolean,
        default:true,
    }
    
})

app.post("/addproduct",async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){//When you have a products array and you want to add a new product//in database
       let last_product_array =  products.slice(-1);//returns a new array containing only the last element of products.
       let last_product = last_product_array[0];//To access the actual last product object from the new array created by slice(-1).
       id=last_product.id+1;//To generate a new unique id for a new product.
    }
    else{//when databse hase no producat
       id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name
    })
})

//api for deleting products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({            //mongoose method
         id:req.body.id
    })
    console.log('removed');
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating api for getting all produts

app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("all produts fetch");
    res.send(products);
})

// schema creating for user model

const User = mongoose.model('User',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now()
    }
    
})

// creating endpoint for registering the user
app.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email id"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })

    await user.save();//save in db

    const data={//obj
        user:{
            id:user.id,
            email:user.email
        }
    }

    const token = jwt.sign(data,'secret_ecom')//data will be emcrpted by one layer using salt
    res.json({success:true,token})
})


//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passcom = req.body.password === user.password;
        if(passcom){
            const data ={
                user:{
                    id:user.id,
                    email:user.email
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:'wrong password'})
        }
    }
    else{
        res.json({success:false,errors:"wrong email id"})
    }
})

// creating endpint for newcollection data
app.get('/newcollection',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("fetched");
    res.send(newcollection);
})

//creating and ponit for popular in women
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women)
})



//creating middlewear to fetch user

const fetchUser = async(req,res,next)=>{
     const token = req.header('auth-token');
     if (!token) {
        return res.status(401).send({errors:"Please authenticate using valid token"})
     }
    
        try {
            const data= jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
          return  res.status(401).send({errors:"invalid token"})
        }
     
}

app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId)
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("added")
})

app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId)
    let userData = await User.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] >0)
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("removed")
})

app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("getcart")
    let userData = await User.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

const Order =  mongoose.model('Order',{
    items:[
        {
        name: {type:String},
        size:{type:Number},
        quantity:{type:Number},
        imageUrl:{type:String},
        price:{type:Number},
        }
    ],
    totalamount:{type: Number, required:true},
    orderDate:{type:Date,default:Date.now},
    userEmail:{type:String,required:true},
})

app.post('/order',async (req,res)=>{
    const {items, totalamount} = req.body;
    try{
        const token = req.headers['auth-token'];

        //Retrieves the token from the request header.

        // Verifies and decodes it with a secret key.

        // Extracts the user’s email so it can be used in the backend logic for actions like creating orders.
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, 'secret_ecom'); // Decode the token
        const userEmail = decoded.user.email;

        const newOrder = new Order({
            items,
            totalamount,
            userEmail
        });

        await newOrder.save();
        res.status(201).json({message:'Order placed successfully',order: newOrder});
    }
    catch (error)
    {
        console.error('Error creating order:',error);
        res.status(500).json({message: 'order failed',error:error.message})
    }
})

const Payment= mongoose.model('Payment',{
    
   pname:{
    type:String,
   },
   paymentemail:{
    type:String,
   },
   phoneNumber:
   {
    type:String,
   },
   address:{
    type:String,
    required:true
   },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

app.post('/payment',async (req,res)=>{
    const { pname, paymentemail, phoneNumber, address, amount } = req.body;

    try{
    const user = await User.findOne({ email: paymentemail });
    
    // Check if the user exists and emails match
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

       
       const newPayment = new Payment ({
        pname,
        paymentemail,
        phoneNumber,
        address,
        amount
       });

       await newPayment.save();


       res.status(201).json({message:'Payment confirmed',payment:newPayment})
    }
    catch (error){
        console.error('Error processing payment:', error);
       res.status(500).json({message: 'payment failed',error:error.message})
    }
})

const Feedback = mongoose.model('Feedback',{
    femail:{
        type:String,
        required:true,
    },
    feedback:{
        type:String
    }
})

app.post('/feedback',async(req,res)=>{
    const {femail,feedback} = req.body
    try{
        

        const newFeedback = new Feedback({
            femail,
            feedback
        });

        await newFeedback.save();
        res.status(201).json({message:'feedback is confirmed',feedback:newFeedback})

    }
    catch(error){
        console.error('Error processing feedback:', error);
        res.status(500).json({message: 'feedback failed',error:error.message})
    }
})

app.get('/feedbacklist',async(req,res) =>{
    try{
       const feedback = await Feedback.find();

       res.json({success:true , feedback});
    }
    catch(error){
       res.status(500).json({success:false,message: 'fail to fetch feedback',error:error.message});
    }
})

app.get('/userlist', async (req, res) => {
    try {
        // Fetch all users from the database, select only name, email, and password
        const users = await User.find();
        
        // Respond with the list of users
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
    }
});

app.get('/orderlist',async (req,res)=>{
    try{
        const orders = await Order.find();

        res.json({success:true,orders})
    }
    catch (error){
        res.status(500).json({success:false,message:'failed',error:error.message});
    }
})

app.get('/paymentlist',async (req,res) =>{
    try{
        const pay = await Payment.find();

        res.json({success:true, pay});
    }catch (error){
        res.status(500).json({success:false, message:'failed to fetch payment info',error:error.message});
    }
})
app.listen(port,(error)=>{
    if(!error){
      console.log("server "+port)  
    }
    else{
        console.log("error :" +error)
    }
})