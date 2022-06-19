const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('', async(req, res) => {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=a0b35f7033b74a18acd5b933b23dbc93`)
        res.render('news', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            res.render('news', { articles : null })
        } else if(err.requiest) {
            res.render('news', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.get('/:id', async(req, res) => {
    let articleID = req.params.id

    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=a0b35f7033b74a18acd5b933b23dbc93/${articleID}`)
        res.render('newsSingle', { article : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('newsSingle', { article : null })
            console.log(err.request)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
})

// DISPLAYED AFTER WE SEARCH IN BOX
// THE GET IS FOR INITIAL
newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`http://newsapi.org/v2/everything?q=${search}&apiKey=a0b35f7033b74a18acd5b933b23dbc93`)
        res.render('newsSearch', { articles : newsAPI.data.articles })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})


module.exports = newsRouter 