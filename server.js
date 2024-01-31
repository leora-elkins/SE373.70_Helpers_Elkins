const express = require('express');
const hbs = require('hbs');
var app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));

hbs.registerHelper('colors',(num)=> {
    var msg = '';
    for(let i=0; i<num; i++) {
        msg+='<tr>';
        for(let j=0; j<num; j++) {
            var color=((1<<24)*Math.random()|0).toString(16);
            msg+=`<td class="colors" style="background-color:#${color}"><span class="top">${color}</span><br/><span class="bottom">${color}</span></td>`;   
        }
        msg+=`</tr>`;
    }
    return new hbs.handlebars.SafeString(msg);
});

hbs.registerHelper('errpage',(num)=> {
    var msg = '<p>Not Found</p>';
    num = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    for(let i=0; i<num; i++) {
        for(let j=0; j<num; j++) {
            msg+=`<div class="shrink" style="background-color:#${color}"></div>`;
        }
    }
    return new hbs.handlebars.SafeString(msg);
});

app.use('/index',(req, res)=> {
    res.render('index.hbs');
})

app.post('/results',(req,res)=> {
    res.render('results.hbs',{
        numberFromForm:req.body.textNumber
    })
})

app.use((req, res, next)=>{
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.listen(3000, ()=>{
    console.log(`Server is running on Port ${port}`);
})