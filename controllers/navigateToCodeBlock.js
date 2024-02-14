const handleNavigationToCodeBlock = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('codeblocks').where({id})
    .then(codeblock => {
        if (codeblock.length) {
            console.log('codeblock:', codeblock[0])
            res.json(codeblock[0]);
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('error getting the codeblock'))
}

module.exports = handleNavigationToCodeBlock;