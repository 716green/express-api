// import packages
const express = require('express');
const axios = require('axios')
const bodyParser = require('body-parser')

// create express app
const app = express();
const port = 3000;

// middleware
app.use(bodyParser.json())


// route
//* jokes
app.get('/joke/:count', (req, res) => {
  let count = req.params.count
    getJoke(count, res)
})


// functions
const getJoke = (numberOfJokes, res) => {
  if (numberOfJokes == "1" || numberOfJokes == "one") {
    axios.get('https://official-joke-api.appspot.com/jokes/programming/random')
      .then(response => {
      const joke = response.data
      res.json(joke)
      }).catch(err => {
      console.error(err)
    })
  } else if (numberOfJokes == "10" || numberOfJokes == "ten") {
      axios.get('https://official-joke-api.appspot.com/jokes/programming/ten')
      .then(response => {
      const joke = response.data
      res.json(joke)
      }).catch(err => {
      console.error(err)
    })
  }
}

//* math
app.get('/math/:type/:num1/:num2', (req, res) => {
  const { num1, num2, type } = req.params
  let first = parseInt(num1);
  let second = parseInt(num2) 

  if (type == "add") {
    const value = first + second
      res.json({value})
  } else if (type == "subtract") {
    const value = first - second
    res.json({value})

  } else if (type == "multiply") {
    const value = first * second
    res.json({ value })
    
  } else if (type == "divide") {
    const value = first / second
    res.json({ value })
    
  } else {
    res.json({error: "unable to calculate"})
  }
})

app.get('/wikipedia', (req, res) => {
  let url = 'https://en.wikipedia.org/wiki/HTML'
  axios.get(url)
    .then(response => {
      let html = response.data
      html = html.split('HTML').join("DOLPHIN MARKUP")
      res.send(html)
    }).catch(err => {
    console.error(err)
  })
})

app.get('*', (req, res) => {
  res.send(`<html>
<head>
  <title>Not Found!</title>
</head>
<body>
  <h1>There's nothing here 😢</h1>
  <h3>Please leave us alone...</h3>
</body>
</html>`)
})


// listening on port 3000
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})