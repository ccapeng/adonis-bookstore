// not really work
Http.onStart = function () {
    Database.on('query', console.log)
    Database.on('sql', console.log)
}