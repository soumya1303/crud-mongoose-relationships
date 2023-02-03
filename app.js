const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
try {
    mongoose.connect('mongodb://127.0.0.1:27017/worldcupDB', {useNewUrlParser: true });    
} catch (error) {
    console.log(error);
}

const countrySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    orgname:{
        type:String,
        required:true
    },
    organiser:{
        type:Boolean,
        required:true
    },
    ranking:Number,
    trophies:Number
});

const cricketerSchema = new mongoose.Schema({
    name:String,
    role:String
});

const captainSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:Number,
    country:countrySchema,
    record:{
        captained:Number,
        won:Number,
        lost:Number,
        nr:Number,
        winratio: Number
    }

});

const teamSchema = new mongoose.Schema({
    country:countrySchema,
    captain:captainSchema,
    record:{
        matches:Number,
        won:Number,
        lost:Number,
        nr:Number,
        winratio:Number
    },
    members:[
        cricketerSchema
    ]
});


const Country = mongoose.model('Country', countrySchema);
const Captain = mongoose.model('Captain', captainSchema);
const Cricketer = mongoose.model('Cricketer', cricketerSchema);
const Team = mongoose.model('Team', teamSchema);

const country = new Country({
    name:'India',
    orgname:'BCCI',
    organiser:false,
    ranking:2,
    trophies:0
});

const cricketer_in_1= new Cricketer({
    name:'Rohit Sharma',
    role:'batsman'
});
const cricketer_in_2=new Cricketer({
    name:'Subhman Gill',
    role:'Batsman'
});
const cricketer_in_3=new Cricketer({
    name:'Virat Kohli',
    role:'Batsman'
});
const cricketer_in_4=new Cricketer({
    name:'Suryakumar Yadav',
    role:'Batsman'
});
const cricketer_in_5=new Cricketer({
    name:'KL Rahul',
    role:'Batsman'
});
const cricketer_in_6=new Cricketer({
    name:'Hardik Pandya',
    role:'All Rounder'
});
const cricketer_in_7=new Cricketer({
    name:'Deepak Hooda',
    role:'Batsman'
});
const cricketer_in_8=new Cricketer({
    name:'Kuldeep Yadav',
    role:'Bowler'
});
const cricketer_in_9=new Cricketer({
    name:'Md Shami',
    role:'Bowler'
});
const cricketer_in_10=new Cricketer({
    name:'Jaspreet Bumrah',
    role:'Bowler'
});
const cricketer_in_11=new Cricketer({
    name:'Umran Malik',
    role:'Bowler'
});
const captain = new Captain({
    name:'Rohit Sharma',
    age:35,
    country:country,
    record:{
        captained:73,
        won:53,
        lost:18,
        nr:2,
        winratio: 74
    }
});
const in_team = new Team({
    country:country,
    captain:captain,
    record:{
        matches:213,
        won:135,
        lost:66,
        nr:12,
        winratio:63
    },
    members:[
        cricketer_in_1, cricketer_in_2, cricketer_in_3, cricketer_in_4, cricketer_in_5, cricketer_in_6, cricketer_in_7, cricketer_in_8, cricketer_in_9, cricketer_in_10, cricketer_in_11
    ]
}); 

country.save((e)=>{
    if (undefined===e || null===e){
        Cricketer.insertMany(in_team.members, (e, resp)=>{
            if (undefined===e || null===e){
                captain.save((e)=>{
                    if (undefined===e || null===e){
                        in_team.save((e)=>{
                            if (undefined===e || null===e){
                                console.log('all documents saved successfully');
                                mongoose.connection.close();                                
                            }else{
                                console.log(e);
                            }
                        });
                    }
                    else{
                        console.log(e);
                    }
                });
            }
            else{
                console.log(e);
            }
        })
    }else{
        console.log(e);
    }
});



