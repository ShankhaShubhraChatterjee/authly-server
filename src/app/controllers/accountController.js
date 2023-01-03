const accountPage = async (req, res) => {
    if (!req.session.auth) {
        res.render('pages/forbidden.pug')
    } else {
        let fname = req.session.user.fname;
        let uname = req.session.user.uname;
        let email = req.session.user.email;
        res.render('pages/account.pug', {
            userinfo: {
                fname: fname || 'null',
                uname: uname || 'null',
                email: email || 'null',
            },
        })
    }
}
module.exports = {
    accountPage,
}
