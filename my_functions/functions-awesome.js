let sendRes = function(promise, res) {
    promise.then((value) => res.send(JSON.stringify(value)))
        .catch((err) => res.send(err.toString()));
};


module.exports.sendRes = sendRes;


