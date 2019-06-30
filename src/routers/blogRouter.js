const express = require('express');
const blogRouter = express.Router();

const blogControllers = require('../controllers/blog.controllers');

function router() {
    blogRouter.route('/')
        .get(blogControllers.blog_get_list);

    blogRouter.route('/:id')
        .get(blogControllers.blog_get_blog)
    
    return blogRouter;
}

module.exports = router;