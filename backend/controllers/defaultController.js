module.exports = (req, res) => {
    res.status(404).json({error: 'This api endpoint does not exist.'});
};