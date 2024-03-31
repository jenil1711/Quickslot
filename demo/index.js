import express from 'express';
const app = express();
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
mongoose.connect('mongodb+srv://jaiminkhunt:Mukesh2422@cluster0.x3y9vkg.mongodb.net/sports',{useNewUrlParser:true,useUnifiedTopology:true});
app.use(express.json());
import cors from 'cors';
app.use(cors())


let vOtp = "";

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "slotquick97@gmail.com",
      pass: "ipky fwco zhrl putp",
    },
  });

const password ="password";
const itemSchema=new mongoose.Schema({
    id: String,
    img:String,
    Bookings:[{
        cnt:Number,
        cntf:Number,
        emails: [{
            type: String,
            default: ''
        }]
    }]
})

const Item = mongoose.model('Item', itemSchema);

const daySchema=new mongoose.Schema({
    day:[{type:itemSchema}]
})

const Day = mongoose.model('Day', daySchema);

app.post('/additem',async (req,res)=>{
    const { p}=req.body;
    if(p!=password)
    {
        return res.send('Not Authorized')
    }
    
    let {id,img,cnt} = req.body;
    cnt=parseInt(cnt);
    let exist = await Item.findOne({id});
    if(exist)
    {
        return res.json({msg:"Item already exists"})
    }
    else
    {
        const newItem = new Item({id,img});
        let arr=new Array(cnt).fill("");
        for(let i=0;i<10;i++)
        {
            newItem.Bookings.push({cnt,cntf:0,emails:arr});
        }
        await newItem.save();
        res.json({newItem});
    }
})

app.post('/allitems',async (req,res)=>{
    const pass = req.headers.pass;

    if(pass==password)
    {
        const Items=await Item.find({});
        res.json(Items);
    }
    else
    {
        res.json({Items:[]});
    }
})

app.post('/getday',async (req,res)=>{
    const pass = req.headers.pass;
    let idx=req.headers.idx;

    if(pass==password)
    {
        const Days=await Day.find({});
        if(idx==-1)
        {
            idx=Days.length;
        }
        if(idx<0 || idx>Days.length)
        {
            return res.json({Items:{day:[]}});
        }
        if(idx==Days.length)
        {
            const all=await Item.find({});
            return res.json({Items:{day:all}});
        }
        return res.json({Items:Days[idx]});
    }
    else
    {
        res.json({Items:[]});
    }
})

app.post('/addday',async (req,res)=>{
    const pass = req.headers.pass;
    const idx=req.headers.idx;
    if(pass==password)
    {
        const Items=await Item.find({});
        let d =await Day.find({});
        // console.log(d);
        // console.log(idx);
        if(d.length>idx)
        {
            let _id= d[d.length-1]._id;
            const uDay=await Day.findByIdAndUpdate(_id,{day:Items});
            return res.json(Items);
        }

        const day = new Day({day:Items});
        await day.save();
        for(let i=0;i<Items.length;i++)
        {
            for(let j=0;j<10;j++)
            {
                Items[i].Bookings[j].cntf=0;
                for(let k=0;k<Items[i].Bookings[j].cnt;k++)
                {
                    Items[i].Bookings[j].emails[k]="";
                }
            }
        }
        // await Item.deleteMany({});
        let len=Items.length;
        for(let i=0;i<len;i++)
        {
            // const item = new Item(Items[i]);
            // console.log(item);
            await Items[i].save();
        }
        res.json(Items);
    }
    else
    {
        res.json({msg:"Wrong Cred"});
    }
})

app.get('/allitems/users',async (req,res)=>{
    const I=await Item.find({});
    let Items=[];
    for(let i=0;i<I.length;i++)
    {
        Items.push({
            id:I[i].id,
            img:I[i].img
        })
    }
    res.json(Items);
})


app.post('/bookitem',async(req,res)=>{
    const {id,time,email,otp} =req.body;
    if(otp!=vOtp)
    {
        return res.json({otp:0});
    }
    const item=await Item.findOne({id});
    if(item)
    {
        const cnt=item.Bookings[time].cnt
        const cntf=item.Bookings[time].cntf
        if(cnt>cntf)
        {
            item.Bookings[time].emails[cntf]= email;
            item.Bookings[time].cntf= cntf+1;
            await item.save();
            const info = await transporter.sendMail({
                from: '"QuickSlot 👻" <slotquick97@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "You have succesfully booked " + item.id, // plain text body
                html: "You have succesfully booked " + item.id, // html body
            });
            res.json({Booked:1});
        }   
        else
        {
            res.json({msg:"Already Booked"})
        }
    }
    else
    {
        res.json({msg:"Item not Availaible"});
    }
})

app.get('/getslots/:id',async(req,res)=>{
    const id=req.params.id;
    const sport = await Item.findOne({id});
    if(sport)
    {
        return res.json({Bookings:sport.Bookings});
    }
    res.json({Bookings:[]});
})



app.get('/sendotp',async(req,res)=>{
    
    let otp = Math.floor(100000 + Math.random() * 900000)
    vOtp=otp;
    const {email} = req.headers;
    const info = await transporter.sendMail({
        from: '"QuickSlot 👻" <slotquick97@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: String(otp), // plain text body
        html: String(otp), // html body
    });
    res.send("Sending otp");
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
