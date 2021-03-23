export const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true)
    }
}