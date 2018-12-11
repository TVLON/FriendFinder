var data = require("../data/friends");

module.exports = function(app){

	app.get("/api/friendsList", function(req, res){
		res.json(data)
	});

	app.post("/api/findBestFriend", function(req, res){
		var matches = [];
		var userScore = req.body.scores;
		console.log(req.body)
		for(let i = 0; i < data.length; i++){
			let friendScore = data[i].scores
			let match = 0;
			for (let x = 0; x < friendScore.length; x++){
				if (friendScore[x] === userScore[x]){
					match++
				}
			}
			matches.push({
				index: i,
				score: match,
			})
		}
		matches.sort(function(left, right) {
			return right.score - left.score
		})
		console.log(matches)
		var result = data[matches[0].index]
		console.log('----- result -----', result);
		res.json(result);
	});
}