const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('',(req,res) => {
  res.render('index',{
    title:'Weather',
    name:'Hikaru Shijo'
  });
})

app.get('/about',(req,res) => {
  res.render('about',{
    title:'About Me',
    name:'Hikaru '
  });
})

app.get('/help',(req,res) => {
  res.render('help',{
    helptext:'this is some helpful text',
    title:'Help',
    name:'Hikaru Shijo'
  })
})


app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error:'You must provide an address term!'
    })
  }
  geocode(req.query.address,(error,data) => {
    if(error){
      return res.send({error})
    }
    forecast(data,(error,forecastData) => {
      if(error){
        return res.send({error})
      }
      res.send({
        forecast:forecastData,
        location:data.location,
        address:req.query.address
      })
    })
  })
})

app.get('/products',(req,res) => {
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term!'
    })
  }
  console.log(req.query);
  res.send({
    products:[]
  })
  
})

app.get('/help/*', (req,res) => {
  res.render('404',{
    title:'404',
    name:'hikaru',
    errorMessage:'Help article not found.'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title:'404',
    name:'hikaru',
    errorMessage:'Page not found.'
  })
})

app.listen(3000,() => {
  console.log('server is up on port 3000.')
})