const handleNavigationToCodeBlock = (req, res, db) => {
    const { id } = req.params;
    let found = false;
    db.array.forEach(codeblock => {
        if (codeblock.id === id) {
            found = true;
            res.json(codeblock);
        } 
    });
    if (!found) {
        res.status(400).json('Not found');
    }
}

module.exports = handleNavigationToCodeBlock;
