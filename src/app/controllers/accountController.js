const accountPage = (req, res) => {
        if(!req.session.authenticated){
            res.render("pages/forbidden.pug")
        }
        else {
            res.render('pages/account.pug', {uname: req.session.user.uname})
        }
}
module.exports = {
    accountPage
}