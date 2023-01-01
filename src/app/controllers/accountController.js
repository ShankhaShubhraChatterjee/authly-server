const accountPage = (req, res) => {
        if(!req.session.auth){
            res.render("pages/forbidden.pug")
        }
        else {
            res.render('pages/account.pug', {uname: req.session.user.uname})
        }
}
module.exports = {
    accountPage
}