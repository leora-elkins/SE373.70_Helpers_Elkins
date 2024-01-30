/*NOTES FORM JAY IN CLASS
    - handlbars has built in loops
    - must use helpers and middleware
    - will run into issues using this is 0 (and 1?) is passed - don't worry about that*/

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